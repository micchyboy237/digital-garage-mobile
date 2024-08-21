To verify your domain by adding DNS records in your domain registrar, follow these step-by-step instructions:

### Step 1: Log In to Your Domain Registrar
1. Go to the website of your domain registrar (e.g., GoDaddy, Namecheap, Google Domains).
2. Log in with your account credentials.

### Step 2: Access DNS Management
1. Once logged in, locate the section where you can manage DNS settings. This is typically labeled as "DNS Management," "DNS Settings," "Manage DNS," or something similar.
2. Click on the DNS management option to access the DNS records associated with your domain.

### Step 3: Add the TXT Records
1. In the DNS management section, look for an option to add a new record. This is often represented by a button labeled "Add Record," "Add DNS Record," or simply a plus sign (+).
2. For each TXT record, fill in the fields as follows:

   - **First TXT Record:**
     - **Host:** `classicgarage.co.uk`
     - **Type:** `TXT`
     - **Value:** `v=spf1 include:_spf.firebasemail.com ~all`
   
   - **Second TXT Record:**
     - **Host:** `classicgarage.co.uk`
     - **Type:** `TXT`
     - **Value:** `firebase=classic-garage-164c2`

3. After entering the details, save the TXT records.

### Step 4: Add the CNAME Records
1. After adding the TXT records, proceed to add the CNAME records by following the same steps to add a new DNS record.
2. For each CNAME record, fill in the fields as follows:

   - **First CNAME Record:**
     - **Host:** `firebase1._domainkey.classicgarage.co.uk`
     - **Type:** `CNAME`
     - **Value:** `mail-classicgarage-co-uk.dkim1._domainkey.firebasemail.com.`
   
   - **Second CNAME Record:**
     - **Host:** `firebase2._domainkey.classicgarage.co.uk`
     - **Type:** `CNAME`
     - **Value:** `mail-classicgarage-co-uk.dkim2._domainkey.firebasemail.com.`

3. Save each CNAME record after entering the details.

### Step 5: Wait for DNS Propagation
1. DNS changes might take some time to propagate across the internet. This can take anywhere from a few minutes to 48 hours.
2. You can use a DNS checker tool (like [DNSChecker.org](https://dnschecker.org)) to verify that your DNS records have been updated and propagated.

### Step 6: Verify Domain in Firebase
1. Once the DNS records have propagated, return to your Firebase console where you initiated the domain verification process.
2. Click the "Verify" button to complete the verification process.

By following these steps, you should successfully verify your domain with Firebase by adding the required DNS records.