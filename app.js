function displayName() {
    var name = document.getElementById("nameInput").value;
    var message = document.getElementById("greetingMessage");

    if (name) {
        message.textContent = name + "さん、こんにちは！";
    } else {
        message.textContent = "名前を入力してください。";
    }
}
