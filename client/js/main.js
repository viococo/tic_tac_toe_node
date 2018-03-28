var site = new Site()

// gestion de la fermeture de la popin
document.getElementById('overlay').addEventListener('click', function(){
  this.classList.add('hidden')
  if(site.toInit) site.init()
  site.toInit = false
})


function initBtn() { // animation du bouton submit
  var bt = document.querySelectorAll('#component-7')[0];
  var turbVal = { val: 0.000001 };
  var turb = document.querySelectorAll('#filter-glitch-3 feTurbulence')[0];
  var btTl = new TimelineLite({ paused: true, onUpdate: function() {
    turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val); // Firefox bug is value is 0
  },
  onStart: function() {
    bt.style.filter = 'url(#filter-glitch-3)';
  },
  onComplete: function() {
    bt.style.filter = 'none';
  } });

  btTl.to(turbVal, 0.4, { val: 0.4 });
  btTl.to(turbVal, 0.2, { val: 0.000001 });

  bt.addEventListener('mouseover', function() {
    btTl.restart();
  });
}

initBtn();
