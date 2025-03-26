# WebSocket Chat

Простое чат-приложение на WebSockets с историей сообщений.

## 🚀 Установка и запуск

### 1. Клонирование репозитория

```sh
git clone https://github.com/DimitriosKhristoforidi/chat-back.git
cd chat-back
```

### 2. Установка зависимостей

```sh
npm install
```

### 3. Запуск сервера

#### В режиме продакшн

```sh
npm start
```

#### В режиме разработки (с автоматическим перезапуском при изменениях)

```sh
npm run dev
```

## 🔥 Использование

1. Запустите фронт.
2. Укажите в качестве источника WS `http://localhost:3000` (или `http://<ВАШ_IP>:3000` для удалённого доступа).
3. Введите сообщение и отправьте его – оно появится у всех подключённых клиентов.

## 🛠 Возможные проблемы и их решение

### Не удаётся подключиться с другого устройства

- Убедитесь, что сервер запущен с `0.0.0.0` (`server.listen(3000, "0.0.0.0")`).
- Проверьте локальный IP-адрес с помощью `ipconfig` (Windows) или `ifconfig` (Mac/Linux) и используйте его вместо `localhost`.
- Разрешите порт `3000` в брандмауэре:
  - **Windows:** Добавьте правило в "Брандмауэр Windows".
  - **Mac/Linux:** Разрешите порт командой `sudo ufw allow 3000/tcp`.

### Сервер падает при ошибке JSON

- Проверьте, отправляются ли корректные JSON-данные в WebSocket-клиенте.
- Добавьте обработку ошибок:
  ```javascript
  try {
    const messageData = JSON.parse(message);
  } catch (error) {
    console.error("Ошибка парсинга JSON", error);
    return;
  }
  ```
