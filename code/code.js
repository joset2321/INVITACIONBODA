window.addEventListener("load", ()=> {
    const ruleta = document.getElementById("ruleta");
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const secconds = document.getElementById("secconds");
    const playAudio = document.getElementById("playAudio");
    const audio = document.getElementById("audio");
    const confirm = document.getElementById("confirm");
    const a = document.getElementById("a");
    const overlord = document.getElementById("overlord");
    const nombre = document.getElementById("nombre");
    const aceptar = document.getElementById("aceptar");
    const theDay = new Date('12 27, 2024 16:00:00').getTime();
    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;

    /**
     * @type {HTMLImageElement[]}
     */
    const imgs = ruleta.children;
    
    let scrollRuleta = 0;
    let sentido = -1
    let isScrolleable = true;
    let now = new Date().getTime();
    let play = false;
    
    setInterval(() => {
        if (isScrolleable) {
            if (scrollRuleta >= 0) {
                sentido = -1;
            }
            if (scrollRuleta <= 0 - (ruleta.clientWidth + 100 - window.innerWidth) ) {
                sentido = 1;
            }
            scrollRuleta += sentido;
            ruleta.style.marginLeft = scrollRuleta + "px";
        }
    }, 30);

    setInterval(() => {
        now += segundo;
        let distancia = theDay - now;

        days.innerText = Math.floor(distancia / (dia));
        hours.innerText = Math.floor((distancia % dia) / hora);
        minutes.innerText = Math.floor((distancia % hora) / minuto);
        secconds.innerText = Math.floor((distancia % minuto) / segundo)
    }, segundo);


    audio.play();

    audio.onplay = ()=> {
        play = true;
    }

    audio.onpause = ()=> {
        play = false;
    }

    audio.onload = ()=> {
        if (!play) {
            audio.play();
        }
    }

    playAudio.onclick = ()=> {
        if (play) {
            audio.pause();
            playAudio.classList.add("icon-play");
            playAudio.classList.remove("icon-pause");
            play = false;
        } else {
            audio.play();
            playAudio.classList.remove("icon-play");
            playAudio.classList.add("icon-pause");
            play = true;
        }
    }

    confirm.onclick = ()=> {
        overlord.style.display = "flex";
    }

    aceptar.onclick = ()=> {
        const name = nombre.value;
        if (name != "") {
            a.href = "https://wa.me/573015614262/?text=Hola, muchas gracias por la invitacion, yo, "+name+", confirmo mi asistencia."
            a.click();
        }
        overlord.style.display = "none";
    }

    ruleta.onmouseover = ()=> {
        isScrolleable = false;
    }
    ruleta.onmouseout = ()=> {
        isScrolleable = true;
    }
}) 