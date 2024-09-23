const formCep = document.querySelector("#form-cep");

formCep.addEventListener("submit", (e) => {
  e.preventDefault();

  let cepInputValue = document.querySelector("#cep-input").value;

  const cepInputDiv = document.querySelector("#cep-input-div");
  const cepInput = document.querySelector("#cep-input");

  const responseContainer = document.querySelector("#response-container");
  responseContainer.innerHTML = "";

  let regexSemHifen = /^[0-9]{8}$/;

  cepInputValue = cepInputValue.replace("-", "");

  if (regexSemHifen.test(cepInputValue)) {
    fetch(`https://viacep.com.br/ws/${cepInputValue}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!("erro" in data)) {
          const listaExibicao = {
            cep: "CEP",
            logradouro: "Logradouro",
            complemento: "Complemento",
            bairro: "Bairro",
            localidade: "Município",
            uf: "Unidade Federativa",
            ddd: "DDD",
          };

          for (let chave in data) {
            if (data[chave] && listaExibicao[chave]) {
              responseContainer.innerHTML += `
                <div class="div-${chave}">
                  <h4 class="h5 title" id="${chave}-title">${listaExibicao[chave]}</h4>
                  <p id="${chave}-content" class="text-light">${data[chave]}</p>
                </div>
              `;
            }
          }

          cepInput.classList.remove("is-invalid");
          cepInputDiv.classList.remove("is-invalid");
        } else {
          // Se o CEP não for encontrado
          cepInput.classList.add("is-invalid");
          cepInputDiv.classList.add("is-invalid");
        }
      });
  } else {
    // Se o CEP for inválido
    cepInput.classList.add("is-invalid");
    cepInputDiv.classList.add("is-invalid");
  }
});
