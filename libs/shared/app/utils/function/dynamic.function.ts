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
  let facadeSize = 0;
  let owner_name = '______________________';
  let store_name = '';
  let reimbursement = '__________________';
  let security_amount = '__________________';
  let total_investment = '__________________';
  let store_dimensions = '__________________';
  let digital_signature = '';
  let store_address = '';
  let pos_size = '10 inch';
  let facade_size_dem = '9x3 ft';
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
      : store_dimensions;
    digital_signature = store.get('digital_signature')
      ? store.get('digital_signature')
      : '';
    store_name = store.get('store_name') ? store.get('store_name') : '';
    store_address = store.get('store_address')
      ? store.get('store_address')
      : '';
    digital_html = '';
    if (
      store.get('current_facade_length_(in_ft)') &&
      store.get('current_facade_height_(in_ft)')
    ) {
      facadeSize =
        parseFloat(store.get('current_facade_length_(in_ft)')) *
        parseFloat(store.get('current_facade_height_(in_ft)'));
      console.log('Facade Size', facadeSize);
    }
    if (store.get('store_dimensions')) {
      if (parseFloat(store.get('store_dimensions')) > 600) {
        pos_size = '15 inch';
      }
      if (parseFloat(store.get('store_dimensions')) > 400) {
        facade_size_dem = '12x3 ft';
      }
    }
  }

  if (digital_signature) {
    digital_html = `<img src='${digital_signature}' style='max-width: 65px' />`;
  }

  const company_stamp_img_url = `<img src='https://nest-bd.s3.ap-south-1.amazonaws.com/img/b9a6ba7d93951e2e10b8fdcbb17467ed.jpeg' style='max-width: 65px' />`;
  const submitHtml = `
  <div>
    <div text-align='center' style='text-align: center; font-size: 18px;'>
      <img src='https://bdo-admin.web.app/assets/images/1k-logo.svg' style='margin: 10px;width: 100px;float: left;position: absolute;left: 15px;top: 2px;'>
      <br><br><br><br>
      <b style='color: orange;'>Odicea Distribution Technologies Private Limited </b>
    </div> 
    <br> 
    <table border='1' style='width: 100%'> 
    <tbody>
        <tr>
    <td style='padding: 10px; background-color: orange; color: white;' colspan='2'><b> Business Details </b></td>
</tr>
<tr>
    <td style='padding: 10px;'>Store Source</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'store_source',
      store,
    )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Name </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('store_name', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Address </td>
<td style='padding: 10px;'>${
    store.get('store_address_pr')
      ? store.get('store_address_pr')['address_line']
      : ''
  }</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Town / Village </td>
<td style='padding: 10px;'>${
    store.get('store_address_pr')
      ? store.get('store_address_pr')['townvillage_pr']
      : ''
  }</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>District </td>
<td style='padding: 10px;'>${
    store.get('store_address_pr')
      ? store.get('store_address_pr')['district_pr']
      : ''
  }</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Pin Code </td>
<td style='padding: 10px;'>${
    store.get('store_address_pr')
      ? store.get('store_address_pr')['pin_code']
      : ''
  }</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>State </td>
<td style='padding: 10px;'>${
    store.get("owner's_present_address_pr")
      ? store.get("owner's_present_address_pr")['select_state']
      : ''
  }</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>GSTIN </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('gstin', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Udhyog Adhaar </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('udyog_aadhar_pr', store)}
</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store PAN</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('store_pan', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Shop &amp; Establishment Act </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'shop_and_establishment_act',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px;  background: orange; color: white;'>
<b>
Store Commercial Details
</b>
</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>1K RPD (INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    '1k_rpd_(inr)',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Dairy, Eggs, Bread RPD(INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'dairy_eggs_and_bread_rpd_(inr)',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Cigarettes and Tobacco RPD (INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'cigarettes_and_tobacco_rpd_(inr)',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Frozen Food and Ice Cream RPD (INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'frozen_food_and_ice_cream_rpd',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Total RPD (INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'total_rpd_(inr)',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Number of Employees</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'number_of_employees',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Employee Expenses (INR)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'employee_expenses_(indian_rupee)',
    store,
  )}</td>
<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px; background-color: orange; color: white;'>
<b>
Store Physical Attributes
</b>
</td>
</tr>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Ownership</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_ownership',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Rent (INR) </td>
<td style='padding: 10px;'>
${getKeyNameValueFromStore('store_rent_(inr)', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Size (Square Feet)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_dimensions',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Facade Size (Width x Height) </td>
<td style='padding: 10px;'>
${getKeyNameValueFromStore(
  'current_facade_length_(in_ft)',
  store,
)} x ${getKeyNameValueFromStore('current_facade_height_(in_ft)', store)} ft</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Store Age (Years)</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_age_(years)',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Layout</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_layout',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px; background-color: orange; color: white;'>
<b>
Current Store Infrastructure
</b>
</td>
</tr>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Rack Type</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('rack_type', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>No. of Refrigerators </td>
<td style='padding: 10px;'>
${
  store.get('infrastructure_available_in_store')
    ? store.get('infrastructure_available_in_store')['no_of_refrigerators']
    : ''
}
</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>No. of Deep Freezers </td>
<td style='padding: 10px;'>
${
  store.get('infrastructure_available_in_store')
    ? store.get('infrastructure_available_in_store')['no_of_deep_freezers']
    : ''
}
</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
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
<tr style='border-color: black; line-height: 25px;'>
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
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>No. of acs </td>
<td style='padding: 10px;'>
${
  store.get('infrastructure_available_in_store')
    ? store.get('infrastructure_available_in_store')['no_of_acs']
    : ''
}
</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px; background-color: orange; color: white;'>
<b>
Store Owner Details
</b>
</td>
</tr>


<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Owner Name</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('owner_name', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Date of Birth </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'date_of_birth',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Owner Aadhar </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'owner_aadhar',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Owner Pan </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('owner_pan', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Email </td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'owner_email',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Current Residential Address </td>
<td style='padding: 10px;'>${mapAddress(
    store.get("owner's_present_address_pr"),
  )}</</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Permanent Residential Address </td>
<td style='padding: 10px'>${mapAddress(
    store.get("owner's_permanent_address_pr"),
  )}</</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Native State</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'native_state',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Owner Mobile No</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore('mobile', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px;  background-color: orange; color: white;'>
<b>
Service Requirement from 1K
</b>
</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>POS (INR 30,000 - waived off)</td>
<td style='padding: 10px;'>${pos_size}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Barcode Scanner (INR 2,500 - waived off)</td>
<td style='padding: 10px;'>Yes</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Thermal Printer (INR 7,500 - waived off)</td>
<td style='padding: 10px;'>Yes</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Billing Counter (INR 25,000 - waived off)</td>
<td style='padding: 10px;'>Yes</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Racks</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'racks_requirement',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Beverage VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Beverage VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>DeepFreezer Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deep_freezer_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>DeepFreezer Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deep_freezer_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Facade Size</td>
<td style='padding: 10px;'>${facade_size_dem}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Facade Type</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'facade_type',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px;  background-color: orange; color: white;'>
<b>
1K Commercials
</b>
</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Ghee, Oil, Sugar, Atta </td>
<td style='padding: 10px;'>3%</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Rest FMCG &amp; Loose</td>
<td style='padding: 10px;'>10%</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>General Merchandise</td>
<td style='padding: 10px;'>15%</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>1K Mall</td>
<td style='padding: 10px;'>5% - 20%</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Rent Terms</td>
<td style='padding: 10px;'>
${
  store.get('commecial_terms')
    ? store.get('commecial_terms')['rent_sharing_pr']
    : ''
}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>
<b>Inventory Investment Required (INR)
(Valuation will be on MRP)</b></td>
<td style='padding: 10px;'>
${getKeyNameValueFromStore('ideal_inventory', store)}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>
<b>Security Deposit (INR)
(Valuation will be on MRP)</b></td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_amount',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>
<b>Total Amount Payable (INR)</b></td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'total_amount_payable_(inr)',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>
<b>Interested in Delivering to Consumers using Store Resources</b></td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'interested_in_delivering_to_consumers_using_store_resources',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>

<td style='padding: 10px' colspan="2">
<b>Billing Limit</b><br><br>
The store's Inventory Refillment Billing Limit will be equal to the sales
made by the store every week. If the store requests inventory in
excess of this billing limit, the store will be required to pay for the
excess inventory at MRP value.<br>
For example, if the store's weekly sales stand at INR 50,000 (MRP
Value), 1K will bill upto INR 50,000 (MRP Value) for inventory
refillment. In case the store requests inventory refillment worth INR
60,000 (MRP value), the store will be required to pay INR 10,000 to
receive its full inventory refillment request. </td>
</tr>

    </tbody>
    </table>
    
     <div style='min-height: 200px;'>
        <div style='float: right; text-align: center; min-height: 120px;'>
        ${digital_html}
        <p>${owner_name}</p><b>Retail Partner</b><br>
        </div>
        <div style='float: left; text-align: center; min-height: 120px;'>
            <div><br> <br> <br>${company_stamp_img_url} <br> <br></div>
            <b>1K KIRANA</b><br></div>
    </div>
    
    <br>
    <hr style='page-break-after: always;'>
    
    <h3 style='font-size: 16px;'> Terms & Conditions:</h3> <ul>
    <left>
  <li style='line-height: 24px;'> 
  All inventory has to be purchased from 1K. 1K will provide a list of items that are not provided by 1K, which the store can purchase from other suppliers. In case 1K fails to fulfill more than 75% items in an order, the store can purchase items not fulfilled by 1K from other vendors.</li>
  <li style='line-height: 24px;'> Weekly Sales Amount should be deposited every week, failing which interest will be charged at 2.5% per month from the due date to actual payment date.	</li>
  <li style='line-height: 24px;'> Consumer prices will be set by 1K and the store will have to comply with 1K's pricing. However 1K will seek feedback from the store and other neighborhood stores on prevalent pricing from time to time as deemed fit by 1K.	 </li>
  <li style='line-height: 24px;'> 
  Products will be billed to the store at pre-decided prices. The difference between the billed price and selling price will be credited to the store as a credit note once that particular product is sold, along with the store commission.	
  </li>
  <li style='line-height: 24px;'> 
  Infrastructure such as POS Hardware, Printer, Barcode Scanner, Billing Counter, Facade Board, and Racks are 1K's property and can be taken back without prior notice at 1K's discretion (based on retailer compliance and performance), unless such infrastructure is billed to the store against specified payment.	
  </li>
  <li style='line-height: 24px;'> 
  Rent, electricity and internet expenses (as agreed upon) will be reimbursed by the 10th of the next month provided:
i. Store completes investment as per inventory norms
ii. Store consistently undertakes sales payments and complies with guidelines issued by 1K from time to time </li>
<li style='line-height: 24px;'> 
  In case the store is unable to complete its required investment, 1K will charge 2.5% interest per month on the amount due	
  </li>
<li style='line-height: 24px;'> 
Expiry/Excess Return: Only items billed by 1K can be returned, provided enough intimation is given in expiry/near expiry items. Items once delivered will not be returned if found damaged.	
  </li>
<li style='line-height: 24px;'> 
  Stores are required to keep a swiping machine provided by 1K at the store for consumers' ease. 1K will provide discount transaction charges on existing market rates to the store.	
</li>
  </left></ul>
  <br>
  <br>
<h3 style='font-size: 16px;'>  Closer &amp; Full &amp; Final Settlement Terms: </h3><ul>
  <li style='line-height: 24px;'> 
  The inventory remaining at a store will be valued at 15% less than the MRP value at the time of closure	</li>
  <li style='line-height: 24px;'> 
  In case the store wants to pay by returning inventory, 1K will accept return of only the items it billed to the store.	
  </li>
  <li style='line-height: 24px;'> 
   In case the store wants to pay in the form of inventory that was not billed by 1K, GST bill is required for same (failing which, GST will be paid by the store and value of the inventory will be on the Purchase Cost prevailing in the market)	
  </li>
  <li style='line-height: 24px;'> 
  30 days prior Notice will be required, if any store wants to discontinue their business from 1K	
</li>
 <li style='line-height: 24px;'> 
  Accounts settlement will be done in 30 days, once confimation is received on settlment from the store	
   </li>
  <li style='line-height: 24px;'> 
  1K can initiate closure of any store without prior notice in case of the store's failure to comply with 1K terms, policies and performance criteria	
  </li>
  </ul>
  <br>
  <br>
        <div style='min-height: 150px;'>
            <div style=' text-align: center;'>
           
                <div style='width: 25%;float: right;'>
                 ${digital_html}
                <p>${owner_name}</p><b>Retail Partner</b><br>
                    Franchisee Store Stamp &amp; Signature Authorized
                </div>
                <div></div>
            </div>
            <div style=' text-align: center; font-weight: 700;'>
                <div style='width: 25%;float: left;'>
                    <div style='min-height: 100px;'>  ${company_stamp_img_url} </div>
                    Franchisor Company Stamp &amp; Signature
                </div>
                <div></div>
            </div>
        </div>
    </div>
        `;

  return submitHtml;
}

export function generateAgreementCardPdfHtml(store: any): string {
  let facadeSize = 0;
  let owner_name = '______________________';
  let store_name = '';
  let reimbursement = '__________________';
  let security_amount = '__________________';
  let total_investment = '__________________';
  let store_dimensions = '__________________';
  let digital_signature = '';
  let store_address = '';
  let pos_size = '10 inch';
  let facade_size_dem = '9x3 ft';
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
      : store_dimensions;
    digital_signature = store.get('digital_signature')
      ? store.get('digital_signature')
      : '';
    store_name = store.get('store_name') ? store.get('store_name') : '';
    store_address = store.get('store_address')
      ? store.get('store_address')
      : '';
    digital_html = '';
    if (
      store.get('current_facade_length_(in_ft)') &&
      store.get('current_facade_height_(in_ft)')
    ) {
      facadeSize =
        parseFloat(store.get('current_facade_length_(in_ft)')) *
        parseFloat(store.get('current_facade_height_(in_ft)'));
      console.log('Facade Size', facadeSize);
    }
    if (store.get('store_dimensions')) {
      if (parseFloat(store.get('store_dimensions')) > 600) {
        pos_size = '15 inch';
      }
      if (parseFloat(store.get('store_dimensions')) > 400) {
        facade_size_dem = '12x3 ft';
      }
    }
  }

  if (digital_signature) {
    digital_html = `<img src='${digital_signature}' style='max-width: 65px' />`;
  }

  const company_stamp_img_url = `<img src='https://nest-bd.s3.ap-south-1.amazonaws.com/img/b9a6ba7d93951e2e10b8fdcbb17467ed.jpeg' style='max-width: 65px' />`;
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
      <tr style='border-color: black; line-height: 25px;'>
      <td colspan='2' style='padding: 10px; background: #fdcf97 !important;'>
      <b>
       Business Details
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Store Source </td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'store_source',
        store,
      )}</td>
    </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Store Name </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_name',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Store Address </td>
        <td style='padding: 10px;'>${
          store.get('store_address_pr')
            ? store.get('store_address_pr')['address_line']
            : ''
        }</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Town / Village </td>
      <td style='padding: 10px;'>${
        store.get('store_address_pr')
          ? store.get('store_address_pr')['townvillage_pr']
          : ''
      }</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>District </td>
    <td style='padding: 10px;'>${
      store.get('store_address_pr')
        ? store.get('store_address_pr')['district_pr']
        : ''
    }</td>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Pin Code </td>
    <td style='padding: 10px;'>${
      store.get('store_address_pr')
        ? store.get('store_address_pr')['pin_code']
        : ''
    }</td>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>State </td>
    <td style='padding: 10px;'>${
      store.get("owner's_present_address_pr")
        ? store.get("owner's_present_address_pr")['select_state']
        : ''
    }</td>
  </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>GSTIN </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'gstin',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Udhyog Adhaar </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'udyog_aadhar_pr',
          store,
        )}
        </td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Store PAN</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_pan',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Shop &amp; Establishment Act </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'shop_and_establishment_act',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td colspan='2' style='padding: 10px;  background: #fdcf97 !important;'>
      <b>
      Store Commercial Details
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>1K RPD (INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          '1k_rpd_(inr)',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Dairy, Eggs, Bread RPD(INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'dairy_eggs_and_bread_rpd_(inr)',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Cigarettes and Tobacco RPD (INR)</td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'cigarettes_and_tobacco_rpd_(inr)',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Frozen Food and Ice Cream RPD (INR)</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'frozen_food_and_ice_cream_rpd',
      store,
    )}</td>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Total RPD (INR)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'total_rpd_(inr)',
          store,
        )}</td>
      </tr>

      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Number of Employees</td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'number_of_employees',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Employee Expenses (INR)</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'employee_expenses_(indian_rupee)',
      store,
    )}</td>
    <tr style='border-color: black; line-height: 25px;'>
      <td colspan='2' style='padding: 10px; background: #fdcf97 !important;'>
      <b>
      Store Physical Attributes
       </b>
      </td>
      </tr>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
  <td style='padding: 10px;'>Store Ownership</td>
  <td style='padding: 10px;'>${getKeyNameValueFromStore(
    'store_ownership',
    store,
  )}</td>
</tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Store Rent (INR) </td>
        <td style='padding: 10px;'>
        ${getKeyNameValueFromStore('store_rent_(inr)', store)}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Store Size (Square Feet)</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'store_dimensions',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Facade Size (Width x Height) </td>
        <td style='padding: 10px;'>
        ${getKeyNameValueFromStore(
          'current_facade_length_(in_ft)',
          store,
        )} x ${getKeyNameValueFromStore(
    'current_facade_height_(in_ft)',
    store,
  )} ft</td>
      </tr>
      
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Store Age (Years)</td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'store_age_(years)',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Layout</td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'store_layout',
      store,
    )}</td>
  </tr>

  <tr style='border-color: black; line-height: 25px;'>
      <td colspan='2' style='padding: 10px; background: #fdcf97 !important;'>
      <b>
      Current Store Infrastructure
       </b>
      </td>
      </tr>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
  <td style='padding: 10px;'>Rack Type</td>
  <td style='padding: 10px;'>${getKeyNameValueFromStore(
    'rack_type',
    store,
  )}</td>
</tr>
      <tr style='border-color: black; line-height: 25px;'>
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
      <tr style='border-color: black; line-height: 25px;'>
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
     <tr style='border-color: black; line-height: 25px;'>
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
      <tr style='border-color: black; line-height: 25px;'>
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
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>No. of acs </td>
      <td style='padding: 10px;'>
      ${
        store.get('infrastructure_available_in_store')
          ? store.get('infrastructure_available_in_store')['no_of_acs']
          : ''
      }
      </td>
    </tr>

    <tr style='border-color: black; line-height: 25px;'>
    <td colspan='2' style='padding: 10px; background: #fdcf97 !important;'>
    <b>
    Store Owner Details
     </b>
    </td>
    </tr>


      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Owner Name</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'owner_name',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Date of Birth </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'date_of_birth',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Owner Aadhar </td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'owner_aadhar',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Owner Pan </td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'owner_pan',
        store,
      )}</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Email </td>
    <td style='padding: 10px;'>${getKeyNameValueFromStore(
      'owner_email',
      store,
    )}</td>
  </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Current Residential Address </td>
        <td style='padding: 10px;'>${mapAddress(
          store.get("owner's_present_address_pr"),
        )}</</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Permanent Residential Address </td>
        <td style='padding: 10px'>${mapAddress(
          store.get("owner's_permanent_address_pr"),
        )}</</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Native State</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'native_state',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Owner Mobile No</td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'mobile',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td colspan='2' style='padding: 10px;  background: #fdcf97 !important;'>
      <b>
      Service Requirement from 1K
       </b>
      </td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>POS (INR 30,000 - waived off)</td>
        <td style='padding: 10px;'>${pos_size}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>Barcode Scanner (INR 2,500 - waived off)</td>
      <td style='padding: 10px;'>Yes</td>
    </tr>
    <tr style='border-color: black; line-height: 25px;'>
    <td style='padding: 10px;'>Thermal Printer (INR 7,500 - waived off)</td>
    <td style='padding: 10px;'>Yes</td>
  </tr>
  <tr style='border-color: black; line-height: 25px;'>
  <td style='padding: 10px;'>Billing Counter (INR 25,000 - waived off)</td>
  <td style='padding: 10px;'>Yes</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Racks</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'racks_requirement',
    store,
  )}</td>
</tr>

<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Beverage VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Beverage VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#refrigerator_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>DeepFreezer Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deep_freezer_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>DeepFreezer Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#deep_freezer_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Price</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_price',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Chocolate VisiCooler Qty</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'security_and_assets_information#visi_cooler_qty',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Facade Size</td>
<td style='padding: 10px;'>${facade_size_dem}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td style='padding: 10px;'>Facade Type</td>
<td style='padding: 10px;'>${getKeyNameValueFromStore(
    'facade_type',
    store,
  )}</td>
</tr>
<tr style='border-color: black; line-height: 25px;'>
<td colspan='2' style='padding: 10px;  background: #fdcf97 !important;'>
<b>
1K Commercials
 </b>
</td>
</tr>
     
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Ghee, Oil, Sugar, Atta </td>
        <td style='padding: 10px;'>3%</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Rest FMCG &amp; Loose</td>
        <td style='padding: 10px;'>10%</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>General Merchandise</td>
        <td style='padding: 10px;'>15%</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>1K Mall</td>
        <td style='padding: 10px;'>5% - 20%</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>Rent Terms</td>
        <td style='padding: 10px;'>
        ${
          store.get('commecial_terms')
            ? store.get('commecial_terms')['rent_sharing_pr']
            : ''
        }</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>
        <b>Inventory Investment Required (INR)
        (Valuation will be on MRP)</b></td>
        <td style='padding: 10px;'>
        ${getKeyNameValueFromStore('ideal_inventory', store)}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
        <td style='padding: 10px;'>
        <b>Security Deposit (INR)
        (Valuation will be on MRP)</b></td>
        <td style='padding: 10px;'>${getKeyNameValueFromStore(
          'security_amount',
          store,
        )}</td>
      </tr>
      <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>
      <b>Total Amount Payable (INR)</b></td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'total_amount_payable_(inr)',
        store,
      )}</td>
    </tr>
   
    <tr style='border-color: black; line-height: 25px;'>
      <td style='padding: 10px;'>
      <b>Interested in Delivering to Consumers using Store Resources</b></td>
      <td style='padding: 10px;'>${getKeyNameValueFromStore(
        'interested_in_delivering_to_consumers_using_store_resources',
        store,
      )}</td>
    </tr>
      <tr style='border-color: black; line-height: 25px;'>

        <td style='padding: 10px' colspan="2">
        <b>Billing Limit</b><br><br>
        The store's Inventory Refillment Billing Limit will be equal to the sales
made by the store every week. If the store requests inventory in
excess of this billing limit, the store will be required to pay for the
excess inventory at MRP value.<br>
For example, if the store's weekly sales stand at INR 50,000 (MRP
Value), 1K will bill upto INR 50,000 (MRP Value) for inventory
refillment. In case the store requests inventory refillment worth INR
60,000 (MRP value), the store will be required to pay INR 10,000 to
receive its full inventory refillment request. </td>
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
     <h3 style='font-size: 16px;'> Terms & Conditions:</h3> <ul>
        <left>
          <li style='line-height: 24px;'> 
           All inventory has to be purchased from 1K. 1K will provide a list of items that are not provided by 1K, which the store can purchase from other suppliers. In case 1K fails to fulfill more than 75% items in an order, the store can purchase items not fulfilled by 1K from other vendors.	</li>
          <li style='line-height: 24px;'> 
           Weekly Sales Amount should be deposited every week, failing which interest will be charged at 2.5% per month from the due date to actual payment date.	
          </li>
          <li style='line-height: 24px;'> 
           Consumer prices will be set by 1K and the store will have to comply with 1K's pricing. However 1K will seek feedback from the store and other neighborhood stores on prevalent pricing from time to time as deemed fit by 1K.	 </li>
          <li style='line-height: 24px;'> 
          Products will be billed to the store at pre-decided prices. The difference between the billed price and selling price will be credited to the store as a credit note once that particular product is sold, along with the store commission.	
          </li>
          <li style='line-height: 24px;'> 
          Infrastructure such as POS Hardware, Printer, Barcode Scanner, Billing Counter, Facade Board, and Racks are 1K's property and can be taken back without prior notice at 1K's discretion (based on retailer compliance and performance), unless such infrastructure is billed to the store against specified payment.	
          </li>
          <li style='line-height: 24px;'> 
          Rent, electricity and internet expenses (as agreed upon) will be reimbursed by the 10th of the next month provided:
<br>i. Store completes investment as per inventory norms
<br>ii. Store consistently undertakes sales payments and complies with guidelines issued by 1K from time to time </li>
          <li style='line-height: 24px;'> In case the store is unable to complete its required investment, 1K will charge 2.5% interest per month on the amount due	</li>
          <li style='line-height: 24px;'> Expiry/Excess Return: Only items billed by 1K can be returned, provided enough intimation is given in expiry/near expiry items. Items once delivered will not be returned if found damaged.	</li>
          <li style='line-height: 24px;'> Stores are required to keep a swiping machine provided by 1K at the store for consumers' ease. 1K will provide discount transaction charges on existing market rates to the store.	</li>
      </left></ul>
      <br>
      <br>
    <h3 style='font-size: 16px;'>  Closer &amp; Full &amp; Final Settlement Terms: </h3><ul>
        <li style='line-height: 24px;'> 
        The inventory remaining at a store will be valued at 15% less than the MRP value at the time of closure	</li>
        <li style='line-height: 24px;'> 
        In case the store wants to pay by returning inventory, 1K will accept return of only the items it billed to the store.	
        </li>
        <li style='line-height: 24px;'> 
        In case the store wants to pay in the form of inventory that was not billed by 1K, GST bill is required for same (failing which, GST will be paid by the store and value of the inventory will be on the Purchase Cost prevailing in the market)	
        </li>
        <li style='line-height: 24px;'> 
        30 days prior Notice will be required, if any store wants to discontinue their business from 1K	
        </li>
        <li style='line-height: 24px;'> 
        Accounts settlement will be done in 30 days, once confimation is received on settlment from the store	
        </li>
        <li style='line-height: 24px;'> 
        1K can initiate closure of any store without prior notice in case of the store's failure to comply with 1K terms, policies and performance criteria	
        </li>
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
`;

  return submitHtml;
}
