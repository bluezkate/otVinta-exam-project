const mRadio = document.getElementById('mRadioAdd'),
    wRadio = document.getElementById('wRadioAdd');

mRadio.addEventListener('click', addChecked1);
wRadio.addEventListener('click', addChecked2);

function addChecked1 () {
    if (!this.hasAttribute("checked")) {
        this.setAttribute("checked", "");

        wRadio.removeAttribute("checked");
    } else return
}

function addChecked2 () {
    if (!this.hasAttribute("checked")) {
        this.setAttribute("checked", "");

        mRadio.removeAttribute("checked");
    } else return
}