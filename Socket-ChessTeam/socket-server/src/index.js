const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

let arrayEquips = [];
let arrayEquipsInGame = [];

let indexEquip = 0;
let indexJugadors = 0;
let contador = 0;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newTeam', (equip) => {
    equip.jugadors[0].colorPeces = 'blanc';
    equip.jugadors[1].colorPeces = 'negre';

    const isAnyEquipInGame = arrayEquipsInGame.some((gameEquip) => {
      return gameEquip.nom === equip.nom;
    });

    const isAnyEquipInEquips = arrayEquips.some((equipInEquips) => {
      return equipInEquips.nom === equip.nom;
    });

    if (isAnyEquipInGame || isAnyEquipInEquips) {
      socket.emit('equipDuplicated', 'Acabes d\'ingressar un equip amb el mateix nom que un altre equip que ja està jugant o que ja està registrat.');
    } else {
      if (arrayEquipsInGame.length === 0) {
        arrayEquips.push(equip);
      } else {
        const isAnyEquipInGame = arrayEquipsInGame.some((gameEquip) => {
          return gameEquip.nom === equip.nom;
        });

        if (!isAnyEquipInGame) {
          arrayEquips.push(equip);
        }
      }
    }
  });

  // Assignar un membre de l'equip a l'usuari
  socket.on('assignTeamMember', () => {

    if (arrayEquips.length >= 2) {
      const jugadorActual = arrayEquips[indexEquip].jugadors[indexJugadors];
      const [equip1, equip2] = arrayEquips;

      switch (contador) {
        case 0:
          socket.emit('assignedMember', { jugadorActual: jugadorActual, indexElMeuTaulell: 0, indexPecesMatades: 0, sala: equip1.nom });
          break;
        case 1:
          socket.emit('assignedMember', { jugadorActual: jugadorActual, indexElMeuTaulell: 1, indexPecesMatades: 0, sala: equip1.nom });
          break;
        case 2:
          socket.emit('assignedMember', { jugadorActual: jugadorActual, indexElMeuTaulell: 0, indexPecesMatades: 1, sala: equip1.nom });
          break;
        case 3:
          socket.emit('assignedMember', { jugadorActual: jugadorActual, indexElMeuTaulell: 1, indexPecesMatades: 1, sala: equip1.nom });
          break;
      }

      indexEquip++;
      if (indexJugadors === 0 && indexEquip > 1) {
        indexJugadors++;
        indexEquip = 0;
      }

      contador++;

      if (contador === 4) {
        indexEquip = 0;
        indexJugadors = 0;
        contador = 0;

        // Comença partida

        const lluitadors1 = { equip: `${equip1.nom} vs ${equip2.nom}`, jugadors: [equip1.jugadors[0].nom, equip2.jugadors[1].nom] };
        const lluitadors2 = { equip: `${equip2.nom} vs ${equip1.nom}`, jugadors: [equip2.jugadors[0].nom, equip1.jugadors[1].nom] };
        const lluitadors = { lluitadors1, lluitadors2, sala: equip1.nom };

        io.emit('startGame', lluitadors);

        // Filtrar els equips que s'han seleccionat per jugar
        const filteredEquips = arrayEquips.filter((equip) => {
          return equip.nom === equip1.nom || equip.nom === equip2.nom;
        });

        arrayEquipsInGame.push(...filteredEquips);

        // Treu els equips que s'han seleccionat per jugar
        arrayEquips = arrayEquips.filter((equip) => {
          return equip.nom !== equip1.nom && equip.nom !== equip2.nom;
        });

        console.log("=================ARRAY EQUIPS===================");
        console.log(arrayEquips);
        console.log("=================ARRAY IN GAME==================");
        console.log(arrayEquipsInGame);
      }

    } else {
      console.log('No hi ha suficients equips');
    }
  });

  socket.on('mourePeca', (moviment) => {

    io.emit('movemPeca', moviment);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  console.log('Total users:', io.engine.clientsCount);
});

http.listen(3000, () => {
  console.log('Listening on port 3000');
});