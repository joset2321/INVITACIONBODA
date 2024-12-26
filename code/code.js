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
    const main = document.querySelector("main");
    const tapa = document.getElementById("tapa");
    const deslizar = document.getElementById("deslizar");
    const open = document.getElementById("open");
    const theDay = new Date('12 27, 2024 17:00:00').getTime();
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
    let scroll = false;
    
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

    deslizar.onclick = ()=> {
        main.style.overflowY = "scroll";
        let s = setInterval(() => {
            main.scrollBy(0, 10);
            if (scroll) {
                clearInterval(s);
            }
        }, 1);
    }
    

    main.addEventListener("scroll", ()=> {
        if (!scroll) {
            let y = main.scrollTop;
            tapa.style.marginTop = y + "px";
            if ((y * 0.03) < 100) {
                deslizar.style.padding = (y*0.03) + "px"
                deslizar.style.filter = "opacity("+(1 - (y*0.03) / 100)+")"
            }
            if (y >= window.innerHeight*5) {
                open.remove();
                main.scrollTo(0, 0);
                audio.play();
                scroll = true;
            }
        }
    })


    audio.onplay = ()=> {
        play = true;
        playAudio.classList.remove("icon-play");
        playAudio.classList.add("icon-pause");
    }

    audio.onpause = ()=> {
        play = false;
        playAudio.classList.add("icon-play");
        playAudio.classList.remove("icon-pause");
    }

    playAudio.onclick = ()=> {
        if (play) {
            audio.pause();
        } else {
            audio.play();
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