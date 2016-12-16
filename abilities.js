'use strict';

exports.BattleAbilities = {
"reliance": {
	shortDesc: "When this Pokemon has 1/4 or less of its max HP, this Pokemon's moves have their priority raised by 1.",
		onModifyPriority: function (priority, pokemon, target, move) {
			if (attacker.hp <= attacker.maxhp / 4) {
				return priority + 1;
			}
		},
		id: "reliance",
		name: "Reliance",
		rating: 4,
		num: 10301,
},
"psychicbarrier": {
		shortDesc: "This Pokemon receives 3/4 damage from supereffective attacks. This Pokemon's Psychic-type attacks also have their power multiplied by 1.3.",
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Solid Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Steelworker boost');
				return this.chainModify(1.3);
			}
		},
		id: "psychicbarrier",
		name: "Psychic Barrier",
		rating: 4,
		num: 10302,
},
"sneakystun": {
		desc: "On switch-in, this Pokemon lowers the Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Attack of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let foeactive = pokemon.side.foe.active;
			let activated = false;
			for (let i = 0; i < foeactive.length; i++) {
				if (!foeactive[i] || !this.isAdjacent(foeactive[i], pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (foeactive[i].volatiles['substitute']) {
					this.add('-immune', foeactive[i], '[msg]');
				} else {
					this.boost({atk: -1}, foeactive[i], pokemon);
				}
			}
		},
		id: "intimidate",
		name: "Intimidate",
		rating: 3.5,
		num: 22,
	},
