const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months = document.getElementById('month')
MONTHS.forEach(month => {
  var opt = document.createElement('option');
    opt.value = month;
    opt.innerHTML = month;
    months.appendChild(opt);
})

