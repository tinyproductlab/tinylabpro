import { importPKCS8, SignJWT } from 'jose';

export const runtime = 'nodejs';

const conditions: Record<string, string> = {
  Clear: '晴朗', MostlyClear: '晴间多云', PartlyCloudy: '多云', MostlyCloudy: '阴天', Cloudy: '阴天',
  Haze: '雾霾', Foggy: '有雾', Drizzle: '毛毛雨', Rain: '有雨', HeavyRain: '大雨',
  Thunderstorms: '雷雨', Snow: '有雪', Windy: '有风', Hot: '炎热', Frigid: '严寒',
};

async function createToken() {
  const teamId = process.env.WEATHERKIT_TEAM_ID;
  const keyId = process.env.WEATHERKIT_KEY_ID;
  const serviceId = process.env.WEATHERKIT_SERVICE_ID;
  const privateKey = process.env.WEATHERKIT_PRIVATE_KEY;
  if (!teamId || !keyId || !serviceId || !privateKey) throw new Error('WeatherKit configuration is incomplete');

  const key = await importPKCS8(privateKey, 'ES256');
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: keyId, id: `${teamId}.${serviceId}` })
    .setIssuer(teamId)
    .setSubject(serviceId)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = Number(searchParams.get('lat') ?? '31.2304');
    const longitude = Number(searchParams.get('lon') ?? '121.4737');
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return Response.json({ error: '位置参数不正确' }, { status: 400 });
    }

    const token = await createToken();
    const endpoint = new URL(`https://weatherkit.apple.com/api/v1/weather/zh-CN/${latitude}/${longitude}`);
    endpoint.searchParams.set('dataSets', 'currentWeather,forecastDaily');
    endpoint.searchParams.set('timezone', 'Asia/Shanghai');
    endpoint.searchParams.set('country', 'CN');
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Apple Weather returned ${response.status}: ${detail.slice(0, 300)}`);
    }
    const weather = await response.json();
    const current = weather.currentWeather;
    const today = weather.forecastDaily?.days?.[0];

    return Response.json({
      temperature: Math.round(current.temperature),
      condition: conditions[current.conditionCode] ?? current.conditionCode,
      conditionCode: current.conditionCode,
      feelsLike: Math.round(current.temperatureApparent),
      humidity: Math.round(current.humidity * 100),
      high: today ? Math.round(today.temperatureMax) : null,
      low: today ? Math.round(today.temperatureMin) : null,
      precipitationChance: today ? Math.round((today.precipitationChance ?? 0) * 100) : null,
      asOf: current.asOf,
      attributionUrl: 'https://weatherkit.apple.com/legal-attribution.html',
    }, { headers: { 'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200' } });
  } catch (error) {
    console.error('WeatherKit request failed', error);
    return Response.json({ error: '暂时无法获取天气数据' }, { status: 502 });
  }
}
