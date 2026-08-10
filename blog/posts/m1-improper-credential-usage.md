This vuln is pretty simple. It occurs when 
:
- credentials are left in the application source code
- credentials are intercepted while in transit between app and backend
- credentials are read after gaining physical access to device.

Honestly, it would be shocking if the first scenario occured. But I have seen vulns that I would place in the same category. I once found a JWT on a website belonging to large conglomerate that used the secret `secret`. You would think their developers would know better. But oh well. 

The second scenario must have to do with either straight up encryption or using https (also essentially encyrption) or both. 

In case of using http instead of https, the risk is obvious. The application makes an api call with credentials and the attacker does a MITM attack. 

It's also possible that your credentials are being transmitted within the device without encryption. This reminds me, there's a project I want to make. I want to attempt to read information from memory before it gets encrypted. Even if the application uses only encrypted credentials, the unencrypted credentials still have to be in memory at least once for the encryption to occur. It would be interesting to see how hard that will be to achieve.

I just realised the scenario specifically mentions application and its backend systems so the case I had in mind isn't applicable. Oops.

Also, if the device has some malware which could actually read plaintext credentials being passed around between internal device processes, you have bigger problems than your password for a random app being leaked.

The third scenario is the age old problem of not hashing information like passwords when stored. Please hash your passwords.

I suppose that's all for this vuln. Pretty basic stuff.