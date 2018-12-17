'use strict';
const form = document.querySelector('.contentform');
const formFields = form.querySelectorAll('[name]');
const postCodeField = form.querySelector('[name="zip"]');
const phoneField = form.querySelector('[name="phone"]');
const submitBtn = form.querySelector('[type="submit"]'); 
const output = document.querySelector('#output');
const editBtn = output.querySelector('.button-contact');
const outputFields = output.querySelectorAll('output');

function loadData() {
  postCodeField.addEventListener('input', event => validateNumberOnly(event.currentTarget));
  phoneField.addEventListener('input', event => validateNumberOnly(event.currentTarget));
  for (const formField of formFields) {
    formField.addEventListener('input', verifyForm);
  }
  form.addEventListener('submit', onSubmit);
  editBtn.addEventListener('click', editMessage);
  verifyForm();
  output.classList.add('hidden');
  form.classList.remove('hidden');
}

function onSubmit(event) {
  event.preventDefault();
  for (const formField of formFields) {
    const outputField = output.querySelector(`#${formField.name}`);
    if (outputField) {
      outputField.value = formField.value;
    }
  }
  form.classList.add('hidden');
  
  output.classList.remove('hidden');
}

function validateNumberOnly(inputField) {
  inputField.value = inputField.value.replace(/\D+/g, '');
  inputField.name === "zip" ? inputField.setAttribute("maxlength","6") : inputField.setAttribute("maxlength","12");
}

function verifyForm() {
  for (const formField of formFields) {
    if (formField.value.length === 0) {
      submitBtn.disabled = true;
      return false;
    }
  }
  submitBtn.disabled = false;
  return true;
}

function editMessage() {
  for (const outputField of outputFields) {
    const formField = form.querySelector(`[name="${outputField.id}"]`);
    console.log(formField);
    if (formField) {
      formField.value = outputField.value;
    }
  }
  output.classList.add('hidden');
  form.classList.remove('hidden');
  verifyForm();
}

document.addEventListener('DOMContentLoaded', loadData);