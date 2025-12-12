const client = new Paho.Client("openlab.kpi.fei.tuke.sk", 443, "player" + Date.now());
client.connect({onSuccess: onConnect, reconnect: true, useSSL: true, keepAliveInterval: 10, timeout: 10});
console.log("JS LOADED");

function onConnect() {
    console.log("Connected to MQTT broker");
    // client.subscribe("openlab/voice/recognition");
    client.subscribe("openlab/weather_changer");
}

client.onMessageArrived = function (message) {
    const jsonMessage = JSON.parse(message.payloadString);
    const {value} = jsonMessage;

    if (value === "jar" || value === "leto" || value === "jesen" || value === "zima") {
        showOnlySeason(value);
    }
    else if (value === "koniec" || value === "stop") {
        showOnlySeason("intro");
    }
};

function showOnlySeason(seasonId) {
    // Skryjeme vsetky stranky
    document.querySelectorAll("body>div").forEach(elem => elem.classList.add("hidden"));
    // Zobrazime zvolenu stranku
    document.getElementById(seasonId).classList.remove("hidden");

}