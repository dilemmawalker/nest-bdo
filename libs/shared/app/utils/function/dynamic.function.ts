export function generateAgreementCardHtml(store: any) {
  let owner_name = '______________________';
  let reimbursement = '__________________';
  let security_amount = '__________________';
  let total_investment = '__________________';
  let store_dimensions = '__________________';

  if (store) {
    owner_name = store.get('owner_name') ? store.get('owner_name') : owner_name;
    security_amount = store.get('security_amount')
      ? store.get('security_amount')
      : security_amount;
    total_investment = store.get('total')
      ? store.get('total')
      : security_amount;
    store_dimensions = store.get('store_dimensions')
      ? store.get('store_dimensions')
      : security_amount;
    reimbursement = store.get('reimbursement')
      ? store.get('reimbursement')
      : security_amount;
  }

  //   const submitHtml = `
  //  <div style='margin: 15px;'><img src='https://bdo-admin.web.app/assets/images/1k-logo.svg' style= 'margin: 10px; width: 100px; float: left; position: absolute;' />
  //   <center><b style='color: #FF8C00; font-size: 18px;'>TO WHOM IT MAY CONCERN</b></center>
  //   <br>
  //   <br>
  //   <br>
  //   <br>
  //   <b style='margin-top:100px; color: #00C6AE'>Commercial Agreement</b>
  //   <p> To  <u> ${owner_name} </u>
  //   <hr>
  //   1. Margins
  //   <ul>
  //   <li>Ghee, Oil, Sugar, Atta - 3%</li>
  //   <li>Rest FMCG & Loose - 10%</li>
  //   <li>General Merchandise - 20%</li>
  //   </ul>
  //   <hr>
  //   2. Reimbursement: <u> ${reimbursement} </u>
  //   <hr>
  //   3. Security Amount: <u> ${security_amount} </u>
  //   <hr>
  //   4. Racks: <u> 21 </u>
  //   <hr>
  //    5. Total Investment(₹): <u> ${total_investment} </u> /sq.ft. , (₹) <u>${store_dimensions}</u> MRP
  //    <hr>
  //    6. Sales person will collect the sales payment on weekly basis. (Monday)
  //    <hr>
  //    7. Sales and marketing will be done by 1K Kirana. (Online and offline both)
  //    <hr>
  //    <ul style='color: #FF8C00;'>
  //   <b style='position: relative; right: 40px'> Note </b>
  //    <li>After completion of investment only you will be available to avail credit limit.</li>
  //   <li>Racks will be installed after completion of investment ( ₹300/sq. ft. as per requirement).</li>
  //   </ul>
  //   </p>
  //   </div>
  //     `;

  const submitHtml = `
    <div class="container">
  <img src='https://bdo-admin.web.app/assets/images/1k-logo.svg' style= 'margin:10px; width: 100px;' />
  <p style = 'text-align: center;'>To whom it may concern</p>
  <p style = 'text-align: center;'>
      <b>Commercial Agreement</b>
  </p>

   <p> To  <u> ${owner_name} </u></p>
   <hr>
   1. Margins
   <ul>
   <li>Ghee, Oil, Sugar, Atta - 3%</li>
   <li>Rest FMCG & Loose - 10%</li>
   <li>General Merchandise - 20%</li>
   </ul>
   <hr>
   2. Reimbursement: <u> ${reimbursement} </u>
   <hr>
   3. Security Amount: <u> ${security_amount} </u> 
   <hr>
   4. Racks: <u> 21 </u>
   <hr>
    5. Total Investment(₹): <u> ${total_investment} </u> /sq.ft. , (₹) <u>${store_dimensions}</u> MRP
    <hr>
    6. Sales person will collect the sales payment on weekly basis. (Monday)
    <hr>
    7. Sales and marketing will be done by 1K Kirana. (Online and offline both)
    <hr>   
    <div>
        <b style='color: red;'>Note </b>
        <li style='color: red;'>After completion of investment only you will be available to avail credit limit.</li>
        <li style='color: red;'>Racks will be installed after completion of investment ( ₹300/sq. ft. as per requirement).</li> 
    </div>
   </div>
     `;
  return submitHtml;
}

export function generateAgreementCardPdfHtml(store: any): string {
  let owner_name = '______________________';
  let reimbursement = '__________________';
  let security_amount = '__________________';
  let total_investment = '__________________';
  let store_dimensions = '__________________';
  let digital_signature = '';
  let digital_html = '';
  if (store) {
    owner_name = store.get('owner_name') ? store.get('owner_name') : owner_name;
    security_amount = store.get('security_amount')
      ? store.get('security_amount')
      : security_amount;
    total_investment = store.get('total')
      ? store.get('total')
      : security_amount;
    store_dimensions = store.get('store_dimensions')
      ? store.get('store_dimensions')
      : security_amount;
    reimbursement = store.get('reimbursement')
      ? store.get('reimbursement')
      : security_amount;
    digital_signature = store.get('digital_signature')
      ? store.get('digital_signature')
      : '';
    digital_html = '';
  }

  if (digital_signature) {
    digital_html = `<img src='${digital_signature}' style='max-width: 100px' />`;
  }

  const submitHtml = `
     <div style='margin: 15px;'><img src='https://bdo-admin.web.app/assets/images/1k-logo.svg' style= 'margin: 10px; width: 100px; float: left; position: absolute;' />
      <center><b style='color: #FF8C00; font-size: 18px;'>TO WHOM IT MAY CONCERN</b></center>
      <br>
      <br>
      <br>
      <br>
      <b style='margin-top:100px; color: #00C6AE'>Commercial Agreement</b>
      <p> To  <u> ${owner_name} </u>
      <hr>
      1. Margins
      <ul>
      <li>Ghee, Oil, Sugar, Atta - 3%</li>
      <li>Rest FMCG & Loose - 10%</li>
      <li>General Merchandise - 20%</li>
      </ul>
      <hr>
      2. Reimbursement: <u> ${reimbursement} </u>
      <hr>
      3. Security Amount: <u> ${security_amount} </u>
      <hr>
      4. Racks: <u> 21 </u>
      <hr>
       5. Total Investment(₹): <u> ${total_investment} </u> /sq.ft. , (₹) <u>${store_dimensions}</u> MRP
       <hr>
       6. Sales person will collect the sales payment on weekly basis. (Monday)
       <hr>
       7. Sales and marketing will be done by 1K Kirana. (Online and offline both)
       <hr>
       <ul style='color: #FF8C00;'>
      <b style='position: relative; right: 40px'> Note </b>
       <li>After completion of investment only you will be available to avail credit limit.</li>
      <li>Racks will be installed after completion of investment ( ₹300/sq. ft. as per requirement).</li>
      </ul>
      </p>
      <div>
      <b>Signature</b><br>${digital_html}
      </div>
      </div>
        `;

  return submitHtml;
}
