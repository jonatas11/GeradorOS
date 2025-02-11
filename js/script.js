// Função para adicionar uma linha de peça na tabela
document.getElementById("addPartButton").addEventListener("click", () => {
  const tableBody = document.querySelector("#partsTable tbody");

  // Criação da nova linha
  const row = document.createElement("tr");

  // Coluna para a quantidade
  const qtyCell = document.createElement("td");
  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.placeholder = "Quantidade";
  qtyInput.required = true;
  qtyCell.appendChild(qtyInput);

  // Adiciona evento para corrigir valores negativos
  qtyInput.addEventListener("input", () => {
    if (qtyInput.value < 1) {
      qtyInput.value = 1; // Corrige o valor se for menor que 1
    }
  });

  qtyCell.appendChild(qtyInput);

  // Coluna para a peça
  const partCell = document.createElement("td");
  const partInput = document.createElement("input");
  partInput.type = "text";
  partInput.placeholder = "Peça";
  partInput.required = true;
  partCell.appendChild(partInput);

  // Coluna para o botão de remover
  const actionCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remover";
  removeButton.addEventListener("click", () => {
    row.remove();
  });
  actionCell.appendChild(removeButton);

  // Adiciona a linha à tabela
  row.appendChild(qtyCell);
  row.appendChild(partCell);
  row.appendChild(actionCell);
  tableBody.appendChild(row);
});

// Gerar PDF com as informações da tabela
document.getElementById("generatePDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  // Capturar os valores dos campos
  const clientName = document.getElementById("clientName").value;
  const vehicle = document.getElementById("vehicle").value;
  const year = document.getElementById("year").value;
  const labor = document.getElementById("labor").value;
  const totalCost = document.getElementById("totalCost").value;

  // Adicionar texto no PDF
  pdf.setFontSize(14);
  pdf.text("Relatório de Serviço", 105, 20, { align: "center" });

  pdf.setFontSize(12);
  pdf.text(`Cliente: ${clientName}`, 10, 40);
  pdf.text(`Veículo: ${vehicle}`, 10, 50);
  pdf.text(`Ano do Veículo: ${year}`, 10, 60);

  // Adicionar Peças Utilizadas
  pdf.text("Peças Utilizadas:", 10, 70);
  const tableBody = document.querySelector("#partsTable tbody");
  let yPosition = 80;
  
  tableBody.querySelectorAll("tr").forEach(row => {
    const qty = row.querySelector("input[type='number']").value;
    const part = row.querySelector("input[type='text']").value;
    pdf.text(`Quantidade: ${qty} | Peça: ${part}`, 10, yPosition);
    yPosition += 10;
  });

  // Adicionar Mão de Obra e Valor Total
  pdf.text("Observação:", 10, yPosition);
  yPosition += 10;
  pdf.text(labor, 10, yPosition);
  yPosition += 10;
  pdf.text(`Valor Total: R$ ${totalCost}`, 10, yPosition);
  pdf.save("relatorio_servico.pdf");
});
