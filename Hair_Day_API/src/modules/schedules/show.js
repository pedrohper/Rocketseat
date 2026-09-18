import dayjs from "dayjs";

const periodMorning = document.querySelector('.period-morning');
const periodAfternoon = document.querySelector('.period-afternoon');
const periodEvening = document.querySelector('.period-evening');

export function schedulesShow({ dailySchedules }) {
    try {
        // 1. Limpa as listas antes de renderizar
        periodMorning.innerHTML = '';
        periodAfternoon.innerHTML = '';
        periodEvening.innerHTML = '';

        // 2. Itera sobre os agendamentos
        dailySchedules.forEach((schedule) => {
            // Criando os elementos
            const item = document.createElement('li');
            const time = document.createElement('strong');
            const name = document.createElement('span');
            const cancelIcon = document.createElement('img');

            // Configurando os dados
            item.setAttribute('data-id', schedule.id);
            time.textContent = dayjs(schedule.when).format('HH:mm');
            name.textContent = schedule.name;
            
            cancelIcon.classList.add('cancel-icon');
            cancelIcon.src = './src/assets/cancel.svg';
            cancelIcon.alt = 'Cancelar';

            // Montando o item (li)
            item.append(time, name, cancelIcon);

            // 3. Lógica de Distribuição (O "pulo do gato")
            const hour = dayjs(schedule.when).hour();

            if (hour < 12) {
                periodMorning.appendChild(item);
            } else if (hour >= 12 && hour < 18) {
                periodAfternoon.appendChild(item);
            } else {
                periodEvening.appendChild(item);
            }
        }); // Fim do forEach

    } catch (error) {
        console.error("Erro ao exibir agendamentos:", error);
        alert("Não foi possível exibir os agendamentos.");
    }
}