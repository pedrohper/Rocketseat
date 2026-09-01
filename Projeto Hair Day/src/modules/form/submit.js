import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";

const form = document.querySelector('form');
const clientName = document.getElementById('client');
const selectedDate = document.getElementById('date');

const inputToday = dayjs(new Date()).format('YYYY-MM-DD');

selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    if (!name) {
      throw new Error('Por favor, insira seu nome.');
    }

    const hourSelected = document.querySelector('.hour-selected');
    if (!hourSelected) {
      throw new Error('Por favor, selecione um horário disponível.');
    }

    const [hour] = hourSelected.textContent.split(':');
    const when = dayjs(selectedDate.value).add(hour, 'hour');
    const id = new Date().getTime();

    await scheduleNew( {
      id,
      name,
      when: when.format(),
    })


  } catch (error) {
    alert(error.message);
  }
}
