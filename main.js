const uploadBtn = document.querySelector(".uploadbtn");
const uploadInput = document.querySelector("#upload");
const viewImage = document.querySelector(".view img");
const resBtn = document.querySelector(".res");
const savBtn = document.querySelector(".sav");
const sliderVals = document.querySelectorAll(".slidervalues p");
const sliderInput = document.querySelector(".slider input");
const filterBtns = document.querySelectorAll(".filters button");
const alignmentBtns = document.querySelectorAll(".alignments button");
const drawBtns = document.querySelectorAll(".draw button");

let brightness = 100, contrast = 100, saturate = 100, retro = 0, blurify = 0, rotate = 0, flipx = 1, flipy = 1;

// (() => {
//     setTimeout(() => {
//         alert("Upload image and start editing");
//     }, 2000);
// })();

// To handle upload actions
uploadBtn.addEventListener("click", () => uploadInput.click());

// To handle upload actions
uploadInput.addEventListener("change", () => {
    let file = uploadInput.files[0];

    if (!file) {
        return;
    }
    else {
        viewImage.src = URL.createObjectURL(file);
        viewImage.addEventListener("load", () => {
            document.querySelector(".container").classList.remove("disable");
        })
    }
})

// To handle upload filters
filterBtns.forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        e.classList.add("active");
        sliderVals[0].innerText = e.id[0].toUpperCase() + e.id.slice(1,);

        if (e.id === "brightness") {
            sliderInput.value = brightness;
            sliderVals[1].innerText = `${brightness} %`;
        }
        else if (e.id === "contrast") {
            sliderInput.value = contrast;
            sliderVals[1].innerText = `${contrast} %`;
        }
        else if (e.id === "saturate") {
            sliderInput.value = saturate;
            sliderVals[1].innerText = `${saturate} %`;
        }
        else if (e.id === "retro") {
            sliderInput.value = retro;
            sliderVals[1].innerText = `${retro} %`;
        }
        else if (e.id === "blur") {
            sliderInput.value = blurify;
            sliderVals[1].innerText = `${blurify} %`;
        }
    })
})

// To handle alignments
alignmentBtns.forEach((e) => {
    e.addEventListener("click", () => {
        if (e.id === "rotateleft") {
            rotate -= 90;
        }
        else if (e.id === "rotateright") {
            rotate += 90;
        }
        else if (e.id === "rotatecustom") {
            document.querySelector(".active").classList.remove("active");
            e.classList.add("active");
            sliderVals[0].innerText = e.id[0].toUpperCase() + e.id.slice(1,);
            sliderVals[1].innerText = `${rotate} %`;
        }
        else if (e.id === "flipx") {
            flipx = flipx === 1 ? -1 : 1;
        }
        else if (e.id === "flipy") {
            flipy = flipy === 1 ? -1 : 1;
        }
        viewImage.style.transform = `rotate(${rotate}deg) scale(${flipx}, ${flipy})`;
    })
})

// To draw something on pixel
drawBtns.forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        e.classList.add("active");
    })
})

// To handle slider
sliderInput.addEventListener("input", () => {
    sliderVals[1].innerText = `${sliderInput.value} %`;

    let sliderState = document.querySelector(".active");
    if (sliderState.id === "brightness") {
        brightness = sliderInput.value;
    }
    else if (sliderState.id === "contrast") {
        contrast = sliderInput.value;
    }
    else if (sliderState.id === "saturate") {
        saturate = sliderInput.value;
    }
    else if (sliderState.id === "retro") {
        retro = sliderInput.value;
    }
    else if (sliderState.id === "blur") {
        blurify = sliderInput.value;
    }
    else if (sliderState.id === "rotatecustom") {
        rotate = sliderInput.value;
    }
    viewImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blurify}px) invert(${retro}%)`;
    viewImage.style.transform = `rotate(${rotate}deg)`;
})

resBtn.addEventListener("click", () => {
    brightness = 100,
        contrast = 100,
        saturate = 100,
        retro = 0,
        blurify = 0,
        rotate = 0,
        flipx = 1,
        flipy = 1;

    viewImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blurify}px) invert(${retro}%)`;
    viewImage.style.transform = `rotate(${rotate}deg) scale(${flipx}, ${flipy})`;
})

savBtn.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = viewImage.naturalWidth;
    canvas.height = viewImage.naturalHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blurify}px) invert(${retro}%)`;
    ctx.scale(flipx, flipy);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(
        viewImage,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height,
    );

    let link = document.createElement("a");
    link.download = `edited.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})