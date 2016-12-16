'use strict';

exports.BattleAbilities = {
"reliance": {
		desc: "When this Pokemon has 1/3 or less of its maximum HP, its attacking stat is multiplied by 1.5 while using a Grass-type attack.",
		shortDesc: "When this Pokemon has 1/3 or less of its max HP, its Grass attacks do 1.5x damage.",
		onModifyAtk: function (atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 4) {
				return priority + 1;
			}
		},
		onModifySpA: function (atk, attacker, defender, move) {
			if (attacker.hp <= attacker.maxhp / 4) {
				move.pranksterBoosted = true;
			}
		},
		id: "reliance",
		name: "Reliance",
		rating: 4,
		num: 65,
	},
};
