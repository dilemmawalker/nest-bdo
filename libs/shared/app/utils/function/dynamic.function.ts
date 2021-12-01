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
      </div>
        `;

  return submitHtml;
}

export function generateAgreementPdfHtml(store: any): string {
  let store_name = '______________________';
  let store_full_address = '__________________';
  let gstin = '__________________';
  let udhyog_adhaar = '__________________';
  let pan = '__________________';
  let shop_establishment_act = '__________________';
  let store_size = '__________________';
  let total_rpd = '__________________';
  let excluding_1k_rpd = '__________________';
  let k_rpd = '__________________';
  let rent = '__________________';
  let owner_name = '__________________';
  let contact_number = '__________________';
  let present_address = '__________________';
  let permanent_address = '__________________';
  let local_immigirant = '__________________';
  let store_property = '__________________';
  let store_age = '__________________';
  let receivables = '__________________';
  let payables = '__________________';
  let facade_size = '__________________';
  let refrigerator = '__________________';
  let deep_freezer = '__________________';
  let visi_cooler = '__________________';
  let ac = '__________________';
  let no_of_employees_in_store = '__________________';
  let employee_expense = '__________________';
  if (store) {
    store_name = store.get('store_name') ? store.get('store_name') : store_name;
    store_full_address = store.get('store_full_address')
      ? store.get('store_full_address')
      : store_full_address;
    gstin = store.get('gstin') ? store.get('gstin') : gstin;
    udhyog_adhaar = store.get('udhyog_adhaar')
      ? store.get('udhyog_adhaar')
      : udhyog_adhaar;
    pan = store.get('pan') ? store.get('pan') : pan;
    shop_establishment_act = store.get('shop_establishment_act')
      ? store.get('shop_establishment_act')
      : shop_establishment_act;
    store_size = store.get('store_size') ? store.get('store_size') : store_size;
    total_rpd = store.get('total_rpd') ? store.get('total_rpd') : total_rpd;
    excluding_1k_rpd = store.get('excluding_1k_rpd')
      ? store.get('excluding_1k_rpd')
      : excluding_1k_rpd;
    k_rpd = store.get('k_rpd') ? store.get('k_rpd') : k_rpd;
    rent = store.get('rent') ? store.get('rent') : rent;
    owner_name = store.get('owner_name') ? store.get('owner_name') : owner_name;
    contact_number = store.get('contact_number')
      ? store.get('contact_number')
      : contact_number;
    present_address = store.get('present_address')
      ? store.get('present_address')
      : present_address;
    permanent_address = store.get('permanent_address')
      ? store.get('permanent_address')
      : permanent_address;
    local_immigirant = store.get('local_immigirant')
      ? store.get('local_immigirant')
      : local_immigirant;
    store_property = store.get('store_property')
      ? store.get('store_property')
      : store_property;
    store_age = store.get('store_age') ? store.get('store_age') : store_age;
    receivables = store.get('receivables')
      ? store.get('receivables')
      : receivables;
    payables = store.get('payables') ? store.get('payables') : payables;
    facade_size = store.get('facade_size')
      ? store.get('facade_size')
      : facade_size;
    refrigerator = store.get('refrigerator')
      ? store.get('refrigerator')
      : refrigerator;
    deep_freezer = store.get('deep_freezer')
      ? store.get('deep_freezer')
      : deep_freezer;
    visi_cooler = store.get('visi_cooler')
      ? store.get('visi_cooler')
      : visi_cooler;
    ac = store.get('ac') ? store.get('ac') : ac;
    no_of_employees_in_store = store.get('no_of_employees_in_store')
      ? store.get('no_of_employees_in_store')
      : no_of_employees_in_store;
    employee_expense = store.get('employee_expense')
      ? store.get('employee_expense')
      : employee_expense;
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
      Commercial Terms: 
      <ul>
      <li> - Rent Terms (Rent Agreement) 50% Share of Rent or Rs. 15000 (whichever is lower): Rs. XXXXX </li>
      <li> - Electricity Bill sharing:  Rs. XXXXX </li>
      <li> - Wifi Bill sharing: Rs. XXXXX
      </li>
      </ul>
      <hr>
       Margins
      <ul>
      <li>Ghee, Oil, Sugar, Atta - 3%</li>
      <li>Rest FMCG & Loose - 10%</li>
      <li>General Merchandise - 20%</li>
      </ul>
      <ul>
      <li>Intial Inventory Investment Required by retailer franchisee (Valuation will be On MRP/15% Less  MRP) - 
      Rs. 1500 per Sqft retail area (Excluding 25k Security) i.e. Rs. XXXXX(In words:- XXXXXXX XXXXX XXXXXXXXX)
Calculation will be done on Area of shop and Rs.1500/Sqft rate.)
      </li>
      <li>Billing Limit - Billing Limit Equal to the sales of every week, if billing crosses his weekly sales limit - 
      it should be the paid billing by the franchaisee (for example if Store has done sales of Rs. 50000 in a week, 
        the  company will bill upto Rs. 50000, incase store demands more  billing in same week it will be payable by store
        </li>
      <li>BD/ASM Proposal If any - Retailer will get Credit of Rs. XXXXX.
      The lock-in period is XX months.
      </li>
      </ul>
      <hr>
      Conditions: <ul> 
      <li> All inventory will be supplied by 1K Franchisor except Dairy, tobacco products, breads and eggs </li>
      <li> Sales Amount should be deposited weekly at a specified date by 1K Franchisee Store  without failure </li>
      <li> Items will be billed on the prices set by 1K Franchisor Company </li>
      <li> Selling price will be set by 1K Franchisor Company in consultation with franchisee Store, but final decision will be taken by 1K Franchisor Company. </li>
      <li> The Franchisor Company will give the difference between billing price(Billed by the Company & Selling Price (Specified by the Franchisor Company) a credit note or Discount will be given to the Franchisee store against that difference on monthly basis </li>
      <li> Infrastructure investment i.e. Racks, shelves, billing counter and façade will be installed after 1 month of smooth operations, However installation of POS machine, Printer will be done on the very first day after the completion of Stock Audit. </li>
      <li> All Infrastructure & System is owned by 1K Franchisor Company and can be taken  back without notice. </li>
      <li> Reimbursement of Rent should be given Post Month & once investment will be done in full capacity as per square feet area, The Franchisee Store will complete his Intial Investment required with in a month from the date of Launch. </li>
      <li> Three security Signed Cheques, Stamp & Letter Head in the name of Store is required 10. The Company will Charge 2% Rate of Interest on the investment done by the Franchisor Store , if the store is unable to put investment required by him </li>
       </ul>
      <hr>
      Closer & Full & Final Settlement Terms: <ul> 
      <li> The Closer of any Franchaisee store is to be done on Cost + Margin Model (The Company will discount all Invoices by taking a nominal margin, rest outstanding is need to be paid by the Franchisee Store </li>
      <li> In Case Franchaisee store wants to pay by returning material, The Franchisor Company will take return the only items that were billed by the Franchisor to the franchisee on MRP value </li>
      <li>  In case the franchisee want to give material that was not billed by the franchisee, GST bill is required for same (failing which GST will be paid by Franchisee store , value of supply will be on the Current Purchase Cost of the market </li>
       </ul>
      <hr>
      Franchisor Company Stamp & Signature Franchisee Store Stamp & Signature Authorized 
      <hr>
      Signatory (BD) Authorized Signatory (Owner)
      </br>
      </p>
      </div>
        `;

  return submitHtml;
}