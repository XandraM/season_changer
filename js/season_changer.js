const client = new Paho.Client("openlab.kpi.fei.tuke.sk", 443, "player" + Date.now());
client.connect({onSuccess: onConnect, reconnect: true, useSSL: true, keepAliveInterval: 10, timeout: 10});

function onConnect() {
    console.log("Connected to MQTT broker");
    // client.subscribe("openlab/voice/recognition");
    client.subscribe("simulator/voice/recognition/am720fg");
}

client.onMessageArrived = function (message) {
    const text = message.payloadString.trim().toLowerCase();
    console.log("Received:", text);

    const seasons = ["jar", "leto", "jesen", "zima"];

    if (seasons.includes(text)) {
        showOnlySeason(text);
    }
};

function showOnlySeason(seasonId) {
    // Skryjeme vsetky stranky
    document.querySelectorAll("body>div").forEach(elem => elem.classList.add("hidden"));
    // Zobrazime zvolenu stranku
    document.getElementById(seasonId).classList.remove("hidden");

}