import '../style/index.scss';
import '../style/common.scss';
import { MDCRipple } from '@material/ripple';
import { MDCTextfield } from '@material/textfield';
import { MDCTabBar } from '@material/tabs';

enum FormStatus {
  Signup,
  Login,
}

function emailSignUp(email: String, password: String, firstname: String, lastname: String) {
  return fetch('https://hospitivus.eu.auth0.com/dbconnections/signup',{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: "XJcDV875FsPIsoqGeWHBjIwigrEjhEJe",
      email: email,
      password: password,
      connection: "Username-Password-Authentication",
      user_metadata: {
        firstName: firstname,
        lastName: lastname
      }
    })
  }).then(
    response => return response.json();
  ).then(
    json => console.log(json);
  );
}

function emailLogin(email: String, password: String) {
  return fetch('https://hospitivus.eu.auth0.com/oauth/ro',{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: "XJcDV875FsPIsoqGeWHBjIwigrEjhEJe",
      username: email,
      password: password,
      connection: "Username-Password-Authentication",
      scope: "openid",
      grant_type: "password"
    })
  }).then(
    response => return response.json();
  ).then(
    json => console.log(json);
  );
}

function handleSubmit(event: Event) {
  event.preventDefault();
  console.log(event);
  if (event.target.elements.submit.value == FormStatus.Signup) {
    console.log('Fire Signup!');
    emailSignUp(event.target.elements.email.value,event.target.elements.password.value,event.target.elements.firstname.value,event.target.elements.lastname.value);
  }
  //emailLogin(event.target.elements.email.value, event.target.elements.password.value);
}

function socialSignIn(event: Event) {
  event.preventDefault();
  const provider = event.srcElement.id.slice(13);
  const nonce = Math.random().toString(36).slice(2);
  const authURL = 'https://hospitivus.eu.auth0.com/authorize?' +
    'response_type=id_token&client_id=XJcDV875FsPIsoqGeWHBjIwigrEjhEJe' +
    '&connection='+ provider +'&redirect_uri=https://www.hospitiv.us/colloquia' +
    '&nonce=' + nonce + '&scope=openid';
  location.assign(authURL);
}

for (let button of document.querySelectorAll('#auth-box .social-login button')) {
  button.addEventListener('click', socialSignIn);
  MDCRipple.attachTo(button);
}

const tabBar = new MDCTabBar(document.getElementById('email-login-tab-bar'));

for (let div of document.querySelectorAll('#auth-box .email-login form div')) {
  MDCTextfield.attachTo(div);
}

const emailSubmitForm = <HTMLFormElement>document.getElementById('email-login-form');

MDCRipple.attachTo(emailSubmitForm.elements.submit);

emailSubmitForm.addEventListener('submit', handleSubmit);

tabBar.listen('MDCTabBar:change',function ({detail: tabs}) {
  if (tabs.activeTabIndex === 0) {
    emailSubmitForm.elements.firstname.parentElement.removeAttribute('style');
    emailSubmitForm.elements.firstname.setAttribute('required', '');
    emailSubmitForm.elements.lastname.parentElement.removeAttribute('style');
    emailSubmitForm.elements.lastname.setAttribute('required', '');
    emailSubmitForm.elements.passconf.parentElement.removeAttribute('style');
    emailSubmitForm.elements.passconf.setAttribute('required', '');
    emailSubmitForm.elements.password.autocomplete = 'new-password';
    emailSubmitForm.elements.submit.value = FormStatus.Signup;
    emailSubmitForm.elements.submit.innerText = 'Personam Constringere';
  } else {
    emailSubmitForm.elements.firstname.parentElement.style = 'display: none;';
    emailSubmitForm.elements.firstname.removeAttribute('required');
    emailSubmitForm.elements.lastname.parentElement.style = 'display: none;';
    emailSubmitForm.elements.lastname.removeAttribute('required');
    emailSubmitForm.elements.passconf.parentElement.style = 'display: none;';
    emailSubmitForm.elements.passconf.removeAttribute('required');
    emailSubmitForm.elements.password.autocomplete = 'current-password';
    emailSubmitForm.elements.submit.value = FormStatus.Login;
    emailSubmitForm.elements.submit.innerText = 'Personam Induere';
  }
});

