export function getKeyNameValueFromStore(keyName, store): string {
  const keyArr = keyName.split('#');
  let fieldValue = '';
  if (keyArr.length == 2) {
    fieldValue = store.get(keyArr[0])[keyArr[1]] || '';
  }
  if (keyArr.length == 1) {
    fieldValue = store.get(keyArr[0]) || '';
  }
  return fieldValue;
}

export function mapAddress(address) {
  const full_address = address
    ? `${address['address_line']}, ${address['townvillage_pr']}, ${address['district_pr']}, ${address['select_state']} , ${address['pin_code']}`
    : '';
  return full_address;
}

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
  //   <li style='line-height: 24px;'>Ghee, Oil, Sugar, Atta - 3%</li>
  //   <li style='line-height: 24px;'>Rest FMCG & Loose - 10%</li>
  //   <li style='line-height: 24px;'>General Merchandise - 20%</li>
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
  //    <li style='line-height: 24px;'>After completion of investment only you will be available to avail credit limit.</li>
  //   <li style='line-height: 24px;'>Racks will be installed after completion of investment ( ₹300/sq. ft. as per requirement).</li>
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
   <li style='line-height: 24px;'>Ghee, Oil, Sugar, Atta - 3%</li>
   <li style='line-height: 24px;'>Rest FMCG & Loose - 10%</li>
   <li style='line-height: 24px;'>General Merchandise - 20%</li>
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
  let store_name = '';
  let reimbursement = '__________________';
  let security_amount = '__________________';
  let total_investment = '__________________';
  let store_dimensions = '__________________';
  let digital_signature = '';
  let store_address = '';
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
    store_name = store.get('store_name') ? store.get('store_name') : '';
    store_address = store.get('store_address')
      ? store.get('store_address')
      : '';
    digital_html = '';
  }

  if (digital_signature) {
    digital_html = `<img src='${digital_signature}' style='max-width: 65px' />`;
  }

  const company_stamp_img_url = `<img src='https://i.pinimg.com/originals/e1/9f/2a/e19f2a3cbe820468d7ba1a835134590c.jpg' style='max-width: 65px' />`;
  const submitHtml = `
<style>
html { -webkit-print-color-adjust: exact; }
</style>
  <div>
    <div text-align="center" style="text-align: center; font-size: 18px;">
      <img src="https://bdo-admin.web.app/assets/images/1k-logo.svg" style="margin: 10px;width: 100px;float: left;position: absolute;left: 15px;top: 2px;">
      <br><br><br><br>
      <b style="color: #FF8C00;font-size: 18px;text-transform: uppercase;">Odicea Distribution Technologies Private Limited </b>
    </div>
    <br>
    <table border="1" style="border: 0px;padding: 11px;width: 100%;">
      <tbody>
      <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2" style='padding: 10px; background: #fdcf97 !important;'>
      <b>
       Business Details
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Store Name </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_name',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Store Address </td>
        <td style='padding: 10px;'>${
          store.get("owner's_present_address_pr")
            ? store.get("owner's_present_address_pr")['address_line']
            : ''
        }</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>Town / Village </td>
      <td style='padding: 10px;'>${
        store.get("owner's_present_address_pr")
          ? store.get("owner's_present_address_pr")['townvillage_pr']
          : ''
      }</td>
    </tr>
    <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>District </td>
    <td style='padding: 10px;'>${
      store.get("owner's_present_address_pr")
        ? store.get("owner's_present_address_pr")['district_pr']
        : ''
    }</td>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>Pin Code </td>
    <td style='padding: 10px;'>${
      store.get("owner's_present_address_pr")
        ? store.get("owner's_present_address_pr")['pin_code']
        : ''
    }</td>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>State </td>
    <td style='padding: 10px;'>${
      store.get("owner's_present_address_pr")
        ? store.get("owner's_present_address_pr")['select_state']
        : ''
    }</td>
  </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>GSTIN </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'gstin',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Udhyog Adhaar </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'udyog_aadhar_pr',
          store,
        )}
        </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Store PAN</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_pan',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Shop &amp; Establishment Act </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'shop_and_establishment_act',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2" style='padding: 10px;  background: #fdcf97 !important;'>
      <b>
      Store Commercial Details
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>1K RPD (INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          '1k_rpd_(inr)',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Dairy, Eggs, Bread RPD(INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'dairy_eggs_and_bread_rpd_(inr)',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>Cigarettes and Tobacco RPD (INR)</td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'cigarettes_and_tobacco_rpd_(inr)',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>Frozen Food and Ice Cream RPD (INR)</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'frozen_food_and_ice_cream_rpd',
      store,
    )}</td>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Total RPD (INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'total_rpd_(inr)',
          store,
        )}</td>
      </tr>

      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>Number of Employees</td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'number_of_employees',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>Employee Expenses (INR)</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'employee_expenses_(indian_rupee)',
      store,
    )}</td>
    <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2" style='padding: 10px; background: #fdcf97 !important;'>
      <b>
      Store Physical Attributes
       </b>
      </td>
      </tr>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
  <td style='padding: 10px;'>Store Ownership</td>
  <td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_ownership',
    store,
  )}</td>
</tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Store Rent (INR) </td>
        <td style='padding: 10px;'>
        ${getKeyNameValueFromStore('store_rent_(inr)', store)}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Store Size (Square Feet)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_dimensions',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Façade Size (Width x Height) </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'facade_size_(width_x_height)',
          store,
        )}</td>
      </tr>
      

  <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2" style='padding: 10px; background: #fdcf97 !important;'>
      <b>
      Current Store Infrastructure
       </b>
      </td>
      </tr>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
  <td style='padding: 10px;'>Rack Type</td>
  <td style='padding: 10px;'>${getKeyNameValueFromStore(
    'rack_type',
    store,
  )}</td>
</tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>No. of Refrigerators </td>
        <td style='padding: 10px;'>
        ${
          store.get('infrastructure_available_in_store')
            ? store.get('infrastructure_available_in_store')[
                'no_of_refrigerators'
              ]
            : ''
        }
        </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>No. of Deep Freezers </td>
      <td style='padding: 10px;'>
      ${
        store.get('infrastructure_available_in_store')
          ? store.get('infrastructure_available_in_store')[
              'no_of_deep_freezers'
            ]
          : ''
      }
      </td>
    </tr>
     <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>No. of Beverage Visicoolers </td>
        <td style='padding: 10px;'>
        ${
          store.get('infrastructure_available_in_store')
            ? store.get('infrastructure_available_in_store')[
                'no_of_beverage_visicoolers'
              ]
            : ''
        }
        </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>No. of chocolate visicoolers </td>
        <td style='padding: 10px;'>
        ${
          store.get('infrastructure_available_in_store')
            ? store.get('infrastructure_available_in_store')[
                'no_of_chocolate_visicoolers'
              ]
            : ''
        }
        </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>No. of acs </td>
      <td style='padding: 10px;'>
      ${
        store.get('infrastructure_available_in_store')
          ? store.get('infrastructure_available_in_store')['no_of_acs']
          : ''
      }
      </td>
    </tr>

    <tr style='border-color: black; line-height: 30px;'>
    <td colspan="2" style='padding: 10px; background: #fdcf97 !important;'>
    <b>
    Store Owner Details
     </b>
    </td>
    </tr>


      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Owner Name</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'owner_name',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Date of Birth </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'date_of_birth',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Owner Aadhar </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'owner_aadhar',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Current Residential Address </td>
        <td style='padding: 10px;'>${mapAddress(
          store.get("owner's_present_address_pr"),
        )}</</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Permanent Residential Address </td>
        <td style='padding: 10px'>${mapAddress(
          store.get("owner's_permanent_address_pr"),
        )}</</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Native State</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'native_state',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Owner Mobile No</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'mobile',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2" style='padding: 10px;  background: #fdcf97 !important;'>
      <b>
      Service Requirement from 1K
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>POS (INR 30,000 - waived off)</td>
        <td style='padding: 10px;'>10 inch</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
      <td style='padding: 10px;'>Barcode Scanner (INR 2,500 - waived off)</td>
      <td style='padding: 10px;'>Yes</td>
    </tr>
    <tr style='border-color: black; line-height: 30px;'>
    <td style='padding: 10px;'>Thermal Printer (INR 7,500 - waived off)</td>
    <td style='padding: 10px;'>Yes</td>
  </tr>
  <tr style='border-color: black; line-height: 30px;'>
  <td style='padding: 10px;'>Billing Counter (INR 25,000 - waived off)</td>
  <td style='padding: 10px;'>Yes</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>Racks</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'racks_requirement',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>Beverage VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>Beverage VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>DeepFreezer Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deepfreezer_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>DeepFreezer Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deepfreezer_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>AC Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#ac_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 30px;'>
<td style='padding: 10px;'>AC Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#ac_qty',
    store,
  )}</td>
</tr>
    
      <tr style='border-color: black; line-height: 30px;'>
      <td colspan="2">
      <br>
      <b style="padding-left: 25px;">Commercial Terms</b>
          <ul>
            <li style='line-height: 24px;'>Rent Terms (Rent Agreement) 50% Share of Rent or Rs. 15000 (whichever is lower): Rs. XXXXX</li>
            <li style='line-height: 24px;'>Electricity Bill sharing: Rs. XXXXX </li>
            <li style='line-height: 24px;'>Wifi Bill sharing: Rs. XXXXX
              (From Business Info Page)</li>
          </ul>
        </td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Ghee, Oil, Sugar, Atta </td>
        <td style='padding: 10px;'>3%</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Rest FMCG &amp; Loose</td>
        <td style='padding: 10px;'>10%</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>General Merchandise</td>
        <td style='padding: 10px;'>15%</td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Intial Inventory Investment Required by retailer franchisee
          (Valuation will be On MRP/15% Less MRP)
        </td>
        <td style='padding: 10px;'></td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>Billing Limit </td>
        <td style='padding: 10px'></td>
      </tr>
      <tr style='border-color: black; line-height: 30px;'>
        <td style='padding: 10px;'>BD/ASM Proposal If any</td>
        <td style='padding: 10px;'></td>
      </tr>
  
    </tbody></table>
    <div style='min-height: 200px;'>
    <div style='float: right; text-align: center; min-height: 120px;'>
    ${digital_html}
    <p>${owner_name}</p>
    <b>Retail Partner</b><br>
    </div>
    <div style='float: left; text-align: center; min-height: 120px;'>
    <div>
    <br>
    <br>
    <br>
    ${company_stamp_img_url}
    <br>
    <br>
    </div>
    <b>1K KIRANA</b><br>
    </div>
    </div>
    </div>
    <br>
    <hr style='page-break-after: always;'>
    <div text-align="left">
     <h3 style='font-size: 16px;'> Conditions:</h3> <ul>
        <left>
          <li style='line-height: 24px;'> All inventory will be supplied by 1K Franchisor except Dairy, tobacco products, breads and eggs </li>
          <li style='line-height: 24px;'> Sales Amount should be deposited weekly at a specified date by 1K Franchisee Store without failure
          </li>
          <li style='line-height: 24px;'> Items will be billed on the prices set by 1K Franchisor Company </li>
          <li style='line-height: 24px;'> Selling price will be set by 1K Franchisor Company in consultation with franchisee Store, but final
            decision will be taken by 1K Franchisor Company. </li>
          <li style='line-height: 24px;'> The Franchisor Company will give the difference between billing price(Billed by the Company &amp; Selling
            Price (Specified by the Franchisor Company) a credit note or Discount will be given to the Franchisee
            store against that difference on monthly basis </li>
          <li style='line-height: 24px;'> Infrastructure investment i.e. Racks, shelves, billing counter and façade will be installed after 1
            month of smooth operations, However installation of POS machine, Printer will be done on the very first
            day after the completion of Stock Audit. </li>
          <li style='line-height: 24px;'> All Infrastructure &amp; System is owned by 1K Franchisor Company and can be taken back without notice.
          </li>
          <li style='line-height: 24px;'> Reimbursement of Rent should be given Post Month &amp; once investment will be done in full capacity as per
            square feet area, The Franchisee Store will complete his Intial Investment required with in a month from
            the date of Launch. </li>
          <li style='line-height: 24px;'> Three security Signed Cheques, Stamp &amp; Letter Head in the name of Store is required 10. The Company
            will Charge 2% Rate of Interest on the investment done by the Franchisor Store , if the store is unable
            to put investment required by him </li>
      </left></ul>
      <br>
      <br>
    <h3 style='font-size: 16px;'>  Closer &amp; Full &amp; Final Settlement Terms: </h3><ul>
        <li style='line-height: 24px;'> The Closer of any Franchaisee store is to be done on Cost + Margin Model (The Company will discount all
          Invoices by taking a nominal margin, rest outstanding is need to be paid by the Franchisee Store </li>
        <li style='line-height: 24px;'> In Case Franchaisee store wants to pay by returning material, The Franchisor Company will take return the
          only items that were billed by the Franchisor to the franchisee on MRP value </li>
        <li style='line-height: 24px;'> In case the franchisee want to give material that was not billed by the franchisee, GST bill is required
          for same (failing which GST will be paid by Franchisee store , value of supply will be on the Current
          Purchase Cost of the market </li>
      </ul>
      <br>
      <br>
      <div style='min-height: 150px;'>
      <div style="
    text-align: center;
    font-weight: 700;
">
    <div style="width: 25%;float: right;">
    <div style='min-height: 100px;'>
    ${digital_html}
    </div>
    Franchisee Store Stamp &amp; Signature Authorized
    </div>
    <div>
        </div></div>
        <div style="
    text-align: center;
    font-weight: 700;
">
    <div style="width: 25%;float: left;">
    <div style='min-height: 100px;'>
    ${company_stamp_img_url}
</div>
Franchisor Company Stamp &amp; Signature 
     
    </div>
    <div>
        </div></div>
    </div>
  </div>
</div>
<br>
<br>
<br>
  <hr style='page-break-after: always;'>
        <br>
        
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
      <li style='line-height: 24px;'>Ghee, Oil, Sugar, Atta - 3%</li>
      <li style='line-height: 24px;'>Rest FMCG & Loose - 10%</li>
      <li style='line-height: 24px;'>General Merchandise - 20%</li>
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
       <li style='line-height: 24px;'>After completion of investment only you will be available to avail credit limit.</li>
      <li style='line-height: 24px;'>Racks will be installed after completion of investment ( ₹300/sq. ft. as per requirement).</li>
      </ul>
      </p>
      <div style='min-height: 200px;'>
      <div style='float: right; text-align: center; min-height: 120px;'>
      ${digital_html}
      <p>${owner_name}</p>
      <b>Retail Partner</b><br>
      </div>
      <div style='float: left; text-align: center; min-height: 120px;'>
      <div>
      <br>
      <br>
      <br>
      ${company_stamp_img_url}
      <br>
      <br>
      </div>
      <b>1K KIRANA</b><br>
      </div>
      </div>
      </div>
        `;

  return submitHtml;
}
