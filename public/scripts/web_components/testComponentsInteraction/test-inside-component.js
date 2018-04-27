export let testInsideComponent = (function () {
    let templateTT = `
        <style>
        
        .cashField{
            background: white;
            border: 1px black;
            font-size: 20px;
            text-align: center;
            position: relative;
            width: 100%;
            height: 25px;
        }
        
        </style>
        <div class="cashField">
            <p id="valueText">0</p>
        </div>
        `;

    class AuthorizationClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateTT;
            this.textField = this.shadowRoot.getElementById('valueText');
            this.value = +this.textField.value || 0;


        }
        static get observedAttributes() { return ['clicked']; }

        attributeChangedCallback(name, oldValue, newValue) {
            this.value++;
            this.textField.innerText = this.value;
            var customEvent = new CustomEvent("helloWorld", { detail: { text: () => "Click " + this.value } });
            this.dispatchEvent(customEvent);
        }
    }


    customElements.define('test-inside-component', AuthorizationClass);
})();
