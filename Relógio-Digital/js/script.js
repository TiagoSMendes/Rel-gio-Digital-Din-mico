const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const dataEl = document.getElementById('data');
const saudacaoEl = document.getElementById('saudacao');

const doisDigitos = (n) => String(n).padStart(2, '0');

const formatoData = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

// Período do dia muda a saudação e as cores do fundo
function periodoDoDia(hr) {
    if (hr >= 5 && hr < 12) return { nome: 'manha', saudacao: 'Bom dia!' };
    if (hr >= 12 && hr < 18) return { nome: 'tarde', saudacao: 'Boa tarde!' };
    return { nome: 'noite', saudacao: 'Boa noite!' };
}

function atualizar() {
    const agora = new Date();
    const hr = agora.getHours();

    horas.textContent = doisDigitos(hr);
    minutos.textContent = doisDigitos(agora.getMinutes());
    segundos.textContent = doisDigitos(agora.getSeconds());

    const data = formatoData.format(agora);
    dataEl.textContent = data.charAt(0).toUpperCase() + data.slice(1);

    const periodo = periodoDoDia(hr);
    saudacaoEl.textContent = periodo.saudacao;
    document.body.dataset.periodo = periodo.nome;

    document.title = `${doisDigitos(hr)}:${doisDigitos(agora.getMinutes())} | Relógio Digital`;
}

// Mostra a hora na hora, sem esperar o primeiro intervalo
atualizar();

// Sincroniza com a virada do segundo e depois atualiza a cada 1 s
// (antes o setInterval não tinha tempo e rodava centenas de vezes por segundo)
setTimeout(() => {
    atualizar();
    setInterval(atualizar, 1000);
}, 1000 - new Date().getMilliseconds());
