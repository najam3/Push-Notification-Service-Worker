const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
  
    return outputArray;
  };


    if('serviceWorker' in  navigator) {
        navigator.serviceWorker.register('./serviceWorker.js', {
        scope: '/'
     }).then(registration => 
        
        registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BN__vMGH1IW8UTQ1kjXZ8K20pWAzQohBlTjFEVk6R7pEBUfg11ZFq7ZISEbSLYdjqhihXtazXeznLvfd6RyMciA')
     })).then(subscription => {
         console.log('subscription', subscription)

        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({endpoint: subscription.endpoint, expiration: subscription.expirationTime, keys: subscription.toJSON().keys})
        })
     })
 }



 