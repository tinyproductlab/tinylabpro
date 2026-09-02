#!/usr/bin/env bash
set -euo pipefail

source /etc/tinylabpro-monitor.env

hostname_value=$(hostname)
disk_used=$(df -P / | awk 'END { gsub("%", "", $5); print $5 }')
load_value=$(cut -d ' ' -f1 /proc/loadavg)
memory_available=$(awk '/MemAvailable/ { printf "%.0f MB", $2 / 1024 }' /proc/meminfo)
app_state=$(docker inspect -f '{{.State.Health.Status}}' unmark-app-1 2>/dev/null || echo "unavailable")

problems=()
if [ "${disk_used:-100}" -ge 85 ]; then
  problems+=("系统磁盘已使用 ${disk_used}%")
fi
if [ "$app_state" != "healthy" ]; then
  problems+=("UNMARK 容器状态：$app_state")
fi

if [ "${#problems[@]}" -eq 0 ]; then
  status="ok"
  problem=""
else
  status="problem"
  problem=$(IFS='；'; echo "${problems[*]}")
fi

details="负载 ${load_value} · 可用内存 ${memory_available} · 磁盘 ${disk_used}% · UNMARK ${app_state}"
payload=$(printf '{"source":"oracle-host","status":"%s","hostname":"%s","problem":"%s","details":"%s"}' \
  "$status" "$hostname_value" "$problem" "$details")

curl --fail --silent --show-error --max-time 15 \
  -X POST "$MONITOR_WEBHOOK_URL" \
  -H "content-type: application/json" \
  -H "cf-webhook-auth: $MONITOR_WEBHOOK_SECRET" \
  --data "$payload" >/dev/null
