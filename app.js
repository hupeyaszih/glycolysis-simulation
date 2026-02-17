// effects -> [effect_on_atp, effect_on_glucose, effect_on_purivat, effect_on_nadh]
const steps = [
    {
        "t": 0,
        "effects": [-1,-1,0,0]
    },
    {
        "t": 1,
        "effects": [-1,0,0,0]
    },
    {
        "t": 2,
        "effects": [0,0,0,2]
    },
    {
        "t": 3,
        "effects": [2,0,0,0]
    },
    {
        "t": 4,
        "effects": [2,0,2,0]
    }
]

const chart = new Chart("myChart", {
  type: "line",
  data: {
    datasets: [{
      borderColor: "red",
      label: "ATP",
      tension: 0.4,
      fill: false
    },{
      borderColor: "green",
      label: "Glikoz",
      tension: 0.4,
      fill: false
    },{
      borderColor: "blue",
      label: "Pürivat",
      tension: 0.4,
      fill: false
    },{
      borderColor: "black",
      label: "NADH",
      tension: 0.4,
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

let stop = false;

let atp = 2;
let glucose = 1;
let purivat = 0;
let nadh = 0;

let total_time_step = glucose * 5;
let time = 0;

function updateChart(t) {
  chart.data.labels.push(t);
  chart.data.datasets[0].data.push(atp);
  chart.data.datasets[1].data.push(glucose);
  chart.data.datasets[2].data.push(purivat);
  chart.data.datasets[3].data.push(nadh);
  chart.update();
}

function next_step() {
    let step = time % steps.length;
    if(time === 0 && glucose <= 0){stop = true; return;} 
    if(time === 0 && atp < 2){stop = true; return;} 

    const n_atp = atp + steps[step]["effects"][0];
    const n_glucose = glucose + steps[step]["effects"][1];
    const n_purivat = purivat + steps[step]["effects"][2];
    const n_nadh2 = nadh + steps[step]["effects"][3];

    if(n_atp < 0 || n_glucose < 0 || n_purivat < 0 || n_nadh2 < 0)
            return;

    atp = n_atp;
    glucose = n_glucose;
    purivat = n_purivat;
    nadh = n_nadh2;
}

function next_time() {
    if(time == 0) set_parameters();
    if(time > total_time_step) stop = true;
    if(!stop)next_step();
    updateChart(time);
    time++;
    print_results();
}

function reset_simulation() {
    atp = 0;
    glucose = 0;
    purivat = 0;
    nadh = 0;

    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];
    chart.data.datasets[2].data = [];
    chart.data.datasets[3].data = [];
    chart.data.labels = [];

    time = 0;
    stop = false;
    chart.update();
}

function set_parameters() {
    const g = parseInt(document.getElementById("glucoseInput").value);
    const a = parseInt(document.getElementById("atpInput").value);

    if(g===0) {alert("Glikoz 0 olamaz");stop = true;}
    if(g<0) {alert("Glikoz sıfırdan küçük olamaz");stop = true;}
    if(a < 0) {alert("ATP sıfırdan küçük olamaz"); stop = true;}

    glucose = g;
    atp = a;
    total_time_step = glucose * 5;
}

function start_simulation(){
    reset_simulation();

    const g = parseInt(document.getElementById("glucoseInput").value);
    const a = parseInt(document.getElementById("atpInput").value);

    set_parameters();

    for(let i = 0;i < total_time_step;i++){
        next_time();
    }
    print_results();
}


function print_results() {
  document.getElementById("resultPanel").style.display = "block";
  document.getElementById("finalATP").innerText =
    "Son durumdaki ATP sayısı: " + atp;
  document.getElementById("finalPyruvate").innerText =
    "Son durumdaki Pürivat sayısı: " + purivat;
  document.getElementById("finalNADH").innerText =
    "Son durumdaki NADH sayısı: " + nadh;
}
