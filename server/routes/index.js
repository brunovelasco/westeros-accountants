let express = require('express');
let router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Westeros Accountants API!' });  
});

// Reads json
const obj = JSON.parse(fs.readFileSync('public/correntistas_banco_bravos_novo.json', 'utf8'));

// Changes boolean to string values
for (let i = 0; i < obj.length; i++) {
  obj[i].male ? obj[i].male = "Homem" : obj[i].male = "Mulher";

  obj[i].isalivemother ? obj[i].isalivemother = "Sim" : obj[i].isalivemother = "Não";
  obj[i].isalivefather ? obj[i].isalivefather = "Sim" : obj[i].isalivefather = "Não";
  obj[i].isaliveheir ? obj[i].isaliveheir = "Sim" : obj[i].isaliveheir = "Não";
  obj[i].isalivespouse ? obj[i].isalivespouse = "Sim" : obj[i].isalivespouse = "Não";
  obj[i].ismarried ? obj[i].ismarried = "Sim" : obj[i].ismarried = "Não";
  obj[i].isnoble ? obj[i].isnoble = "Sim" : obj[i].isnoble = "Não";
  obj[i].ispopular ? obj[i].ispopular = "Sim" : obj[i].ispopular = "Não";
  obj[i].book1 ? obj[i].book1 = "Sim" : obj[i].book1 = "Não";
  obj[i].book2 ? obj[i].book2 = "Sim" : obj[i].book2 = "Não";
  obj[i].book3 ? obj[i].book3 = "Sim" : obj[i].book3 = "Não";
  obj[i].book4 ? obj[i].book4 = "Sim" : obj[i].book4 = "Não";
  obj[i].book5 ? obj[i].book5 = "Sim" : obj[i].book5 = "Não";
}

// Sends json
router.get('/get_csv_data', function(req, res) {
  res.send(obj);
});

// Sends columns names and its accessors (being used in React Table)
router.get('/get_csv_columns', function(req, res) {
  let csv_ids = Object.keys(obj[0]);

  let csv_names = ['Nome', 'Título', 'Sexo', 'Cultura', 'Mãe', 'Pai', 'Herdeiro', 'Casa', 'Cônjuge', 'Livro 1', 'Livro 2', 'Livro 3', 'Livro 4', 'Livro 5', 'Mãe está viva?', 'Pai está vivo?', 'Herdeiro está vivo?', 'Cônjuge está vivo?', 'É casado(a)?', 'É nobre?', 'Relacionado a mortes', 'É popular?', 'Popularidade', 'Dívida', 'Capacidade de pagamento anual', 'Patrimônio', 'Porcentagem do Total', 'Curva'];

  let columns = [];
  for (let i = 0; i < csv_ids.length; i++) {
    columns.push({
      Header: csv_names[i],
      accessor: csv_ids[i],
    });
  }
  res.send(columns);
});

// Sends data calculations regarding ABC curve
router.get('/get_csv_abc_analysis', function(req, res) {
  let abc = { totalA: 0, totalB: 0, totalC: 0 };
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].curva === "A") {
      abc.totalA += parseFloat(obj[i].patrimnio.replace(",", "."));
      abc.peopleA = i;
    }

    if (obj[i].curva === "B") {
      index = 1;
      abc.totalB += parseFloat(obj[i].patrimnio.replace(",", "."));
      abc.peopleB = i;
    }

    if (obj[i].curva === "C") {
      index = 2;
      abc.totalC += parseFloat(obj[i].patrimnio.replace(",", "."));
      abc.peopleC = i;
    }
  }
  abc.peopleC = abc.peopleC - abc.peopleB;
  abc.peopleB = abc.peopleB - abc.peopleA;

  abc.totalAll = abc.totalA + abc.totalB + abc.totalC;
  abc.peopleAll = abc.peopleA + abc.peopleB + abc.peopleC;

  abc.totalAPercent = ((abc.totalA * 100)/abc.totalAll).toFixed(2);
  abc.totalBPercent = ((abc.totalB * 100)/abc.totalAll).toFixed(2);
  abc.totalCPercent = ((abc.totalC * 100)/abc.totalAll).toFixed(2);

  abc.peopleAPercent = (abc.peopleA * 100)/abc.peopleAll;
  abc.peopleBPercent = (abc.peopleB * 100)/abc.peopleAll;
  abc.peopleCPercent = (abc.peopleC * 100)/abc.peopleAll;

  res.send(abc);
});

// Sends quantity of people from each major house
router.get('/get_csv_houses', function(req, res) {
  let result = {};

  for (let i = 0; i < obj.length; i++) {
    switch (obj[i].house) {
      case "House Targaryen":
        result.Targaryen = result.Targaryen + 1 || 0;
        break;
      case "House Stark":
        result.Stark = result.Stark + 1 || 0;
        break;
      case "House Lannister":
        result.Lannister = result.Lannister + 1 || 0;
        break;
      case "House Greyjoy":
        result.Greyjoy = result.Greyjoy + 1 || 0;
        break;
      case "House Baratheon":
        result.Baratheon = result.Baratheon + 1 || 0;
        break;
    }
  }
  res.send(result);
});

// Sends gender data
router.get('/get_csv_genders', function(req, res) {
  let result = {};

  for (let i = 0; i < obj.length; i++) {
    switch (obj[i].male) {
      case "Mulher":
        result.Mulheres = result.Mulheres + 1 || 0;
        break;
      case "Homem":
        result.Homens = result.Homens + 1 || 0;
        break;
    }
  }
  res.send(result);
});

module.exports = router;
