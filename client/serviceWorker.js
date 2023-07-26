console.log('Worker is running push notifications')

self.addEventListener("push", e => {
  const data = e.data.json();

  self.registration.showNotification(data.title);
})
  