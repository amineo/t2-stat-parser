/* eslint-disable */

// Fixup player stat line types
function formatPlayerStats(statObj: any) {
	return {
		...statObj.stats,
		masTG: Number(statObj.stats.masTG),
		cgMATG: Number(statObj.stats.cgMATG),
		kdrAvg: Number(statObj.stats.kdrAvg),
		nullTG: Number(statObj.stats.nullTG),
		cgComTG: Number(statObj.stats.cgComTG),
		cgDmgTG: Number(statObj.stats.cgDmgTG),
		fullSet: Number(statObj.stats.fullSet),
		gamePCT: Number(statObj.stats.gamePCT),
		killsTG: Number(statObj.stats.killsTG),
		scoreTG: Number(statObj.stats.scoreTG),
		armorHTG: Number(statObj.stats.armorHTG),
		armorLTG: Number(statObj.stats.armorLTG),
		armorMTG: Number(statObj.stats.armorMTG),
		assistTG: Number(statObj.stats.assistTG),
		cgACCAvg: Number(statObj.stats.cgACCAvg),
		cgHitsTG: Number(statObj.stats.cgHitsTG),
		dayStamp: Number(statObj.stats.dayStamp),
		deathsTG: Number(statObj.stats.deathsTG),
		discMATG: Number(statObj.stats.discMATG),
		mineMATG: Number(statObj.stats.mineMATG),
		onFireTG: Number(statObj.stats.onFireTG),
		scoreAvg: Number(statObj.stats.scoreAvg),
		scoreMax: Number(statObj.stats.scoreMax),
		timeTLTG: Number(statObj.stats.timeTLTG),
		EVKillsTG: Number(statObj.stats.EVKillsTG),
		EVMAHitTG: Number(statObj.stats.EVMAHitTG),
		airTimeTG: Number(statObj.stats.airTimeTG),
		armorHDTG: Number(statObj.stats.armorHDTG),
		armorHHTG: Number(statObj.stats.armorHHTG),
		armorHLTG: Number(statObj.stats.armorHLTG),
		armorHMTG: Number(statObj.stats.armorHMTG),
		armorLDTG: Number(statObj.stats.armorLDTG),
		armorLHTG: Number(statObj.stats.armorLHTG),
		armorLLTG: Number(statObj.stats.armorLLTG),
		armorLMTG: Number(statObj.stats.armorLMTG),
		armorMDTG: Number(statObj.stats.armorMDTG),
		armorMHTG: Number(statObj.stats.armorMHTG),
		armorMLTG: Number(statObj.stats.armorMLTG),
		armorMMTG: Number(statObj.stats.armorMMTG),
		cgKillsTG: Number(statObj.stats.cgKillsTG),
		cgScoreTG: Number(statObj.stats.cgScoreTG),
		discComTG: Number(statObj.stats.discComTG),
		discDmgTG: Number(statObj.stats.discDmgTG),
		distMovTG: Number(statObj.stats.distMovTG),
		hitHeadTG: Number(statObj.stats.hitHeadTG),
		hitLegsTG: Number(statObj.stats.hitLegsTG),
		killAirTG: Number(statObj.stats.killAirTG),
		laserMATG: Number(statObj.stats.laserMATG),
		mapGameID: Number(statObj.stats.mapGameID),
		mineComTG: Number(statObj.stats.mineComTG),
		mineDmgTG: Number(statObj.stats.mineDmgTG),
		onFireAvg: Number(statObj.stats.onFireAvg),
		onInputTG: Number(statObj.stats.onInputTG),
		shockMATG: Number(statObj.stats.shockMATG),
		timeTLAvg: Number(statObj.stats.timeTLAvg),
		totalMATG: Number(statObj.stats.totalMATG),
		weekStamp: Number(statObj.stats.weekStamp),
		yearStamp: Number(statObj.stats.yearStamp),
		EVDeathsTG: Number(statObj.stats.EVDeathsTG),
		EVHitWepTG: Number(statObj.stats.EVHitWepTG),
		airTimeAvg: Number(statObj.stats.airTimeAvg),
		armorHHDTG: Number(statObj.stats.armorHHDTG),
		armorHLDTG: Number(statObj.stats.armorHLDTG),
		armorHMDTG: Number(statObj.stats.armorHMDTG),
		armorLHDTG: Number(statObj.stats.armorLHDTG),
		armorLLDTG: Number(statObj.stats.armorLLDTG),
		armorLMDTG: Number(statObj.stats.armorLMDTG),
		armorMHDTG: Number(statObj.stats.armorMHDTG),
		armorMLDTG: Number(statObj.stats.armorMLDTG),
		armorMMDTG: Number(statObj.stats.armorMMDTG),
		cgDeathsTG: Number(statObj.stats.cgDeathsTG),
		cgHitSVMax: Number(statObj.stats.cgHitSVMax),
		cgHitVVMax: Number(statObj.stats.cgHitVVMax),
		deathAirTG: Number(statObj.stats.deathAirTG),
		discACCAvg: Number(statObj.stats.discACCAvg),
		discHitsTG: Number(statObj.stats.discHitsTG),
		hitTorsoTG: Number(statObj.stats.hitTorsoTG),
		laserComTG: Number(statObj.stats.laserComTG),
		laserDmgTG: Number(statObj.stats.laserDmgTG),
		lastKillTG: Number(statObj.stats.lastKillTG),
		maHitSVMax: Number(statObj.stats.maHitSVMax),
		mineACCAvg: Number(statObj.stats.mineACCAvg),
		mineHitsTG: Number(statObj.stats.mineHitsTG),
		monthStamp: Number(statObj.stats.monthStamp),
		mortarMATG: Number(statObj.stats.mortarMATG),
		onInputAvg: Number(statObj.stats.onInputAvg),
		plasmaMATG: Number(statObj.stats.plasmaMATG),
		playerName: Number(statObj.stats.playerName),
		shockComTG: Number(statObj.stats.shockComTG),
		shockDmgTG: Number(statObj.stats.shockDmgTG),
		suicidesTG: Number(statObj.stats.suicidesTG),
		totalGames: Number(statObj.stats.totalGames),
		versionNum: Number(statObj.stats.versionNum),
		avgSpeedAvg: Number(statObj.stats.avgSpeedAvg),
		blasterMATG: Number(statObj.stats.blasterMATG),
		cgKillAirTG: Number(statObj.stats.cgKillAirTG),
		cgKillSVMax: Number(statObj.stats.cgKillSVMax),
		cgKillVVMax: Number(statObj.stats.cgKillVVMax),
		cgMADistMax: Number(statObj.stats.cgMADistMax),
		chainKillTG: Number(statObj.stats.chainKillTG),
		discAoeMATG: Number(statObj.stats.discAoeMATG),
		discKillsTG: Number(statObj.stats.discKillsTG),
		discScoreTG: Number(statObj.stats.discScoreTG),
		firstKillTG: Number(statObj.stats.firstKillTG),
		flagGrabsTG: Number(statObj.stats.flagGrabsTG),
		grenadeMATG: Number(statObj.stats.grenadeMATG),
		laserACCAvg: Number(statObj.stats.laserACCAvg),
		laserHitsTG: Number(statObj.stats.laserHitsTG),
		lavaKillsTG: Number(statObj.stats.lavaKillsTG),
		maxSpeedMax: Number(statObj.stats.maxSpeedMax),
		mineKillsTG: Number(statObj.stats.mineKillsTG),
		mineScoreTG: Number(statObj.stats.mineScoreTG),
		missileMATG: Number(statObj.stats.missileMATG),
		mortarComTG: Number(statObj.stats.mortarComTG),
		mortarDmgTG: Number(statObj.stats.mortarDmgTG),
		multiKillTG: Number(statObj.stats.multiKillTG),
		plasmaComTG: Number(statObj.stats.plasmaComTG),
		plasmaDmgTG: Number(statObj.stats.plasmaDmgTG),
		satchelMATG: Number(statObj.stats.satchelMATG),
		shockACCAvg: Number(statObj.stats.shockACCAvg),
		shockHitsTG: Number(statObj.stats.shockHitsTG),
		totalTimeTG: Number(statObj.stats.totalTimeTG),
		blasterComTG: Number(statObj.stats.blasterComTG),
		blasterDmgTG: Number(statObj.stats.blasterDmgTG),
		cgDeathAirTG: Number(statObj.stats.cgDeathAirTG),
		cgHitDistMax: Number(statObj.stats.cgHitDistMax),
		comboCountTG: Number(statObj.stats.comboCountTG),
		crashKillsTG: Number(statObj.stats.crashKillsTG),
		ctrlKKillsTG: Number(statObj.stats.ctrlKKillsTG),
		deathKillsTG: Number(statObj.stats.deathKillsTG),
		discDeathsTG: Number(statObj.stats.discDeathsTG),
		discHitSVMax: Number(statObj.stats.discHitSVMax),
		discHitVVMax: Number(statObj.stats.discHitVVMax),
		doubleKillTG: Number(statObj.stats.doubleKillTG),
		grenadeComTG: Number(statObj.stats.grenadeComTG),
		grenadeDmgTG: Number(statObj.stats.grenadeDmgTG),
		groundTimeTG: Number(statObj.stats.groundTimeTG),
		hGrenadeMATG: Number(statObj.stats.hGrenadeMATG),
		killAirAirTG: Number(statObj.stats.killAirAirTG),
		killGroundTG: Number(statObj.stats.killGroundTG),
		killStreakTG: Number(statObj.stats.killStreakTG),
		laserKillsTG: Number(statObj.stats.laserKillsTG),
		laserScoreTG: Number(statObj.stats.laserScoreTG),
		lavaDeathsTG: Number(statObj.stats.lavaDeathsTG),
		maHitDistMax: Number(statObj.stats.maHitDistMax),
		mineDeathsTG: Number(statObj.stats.mineDeathsTG),
		mineHitVVMax: Number(statObj.stats.mineHitVVMax),
		missileComTG: Number(statObj.stats.missileComTG),
		missileDmgTG: Number(statObj.stats.missileDmgTG),
		morepointsTG: Number(statObj.stats.morepointsTG),
		mortarACCAvg: Number(statObj.stats.mortarACCAvg),
		mortarHitsTG: Number(statObj.stats.mortarHitsTG),
		plasmaACCAvg: Number(statObj.stats.plasmaACCAvg),
		plasmaHitsTG: Number(statObj.stats.plasmaHitsTG),
		quarterStamp: Number(statObj.stats.quarterStamp),
		satchelComTG: Number(statObj.stats.satchelComTG),
		satchelDmgTG: Number(statObj.stats.satchelDmgTG),
		shockKillsTG: Number(statObj.stats.shockKillsTG),
		shockScoreTG: Number(statObj.stats.shockScoreTG),
		shotsFiredTG: Number(statObj.stats.shotsFiredTG),
		tripleKillTG: Number(statObj.stats.tripleKillTG),
		blasterACCAvg: Number(statObj.stats.blasterACCAvg),
		blasterHitsTG: Number(statObj.stats.blasterHitsTG),
		cgKillDistMax: Number(statObj.stats.cgKillDistMax),
		crashDeathsTG: Number(statObj.stats.crashDeathsTG),
		deathAirAirTG: Number(statObj.stats.deathAirAirTG),
		deathGroundTG: Number(statObj.stats.deathGroundTG),
		decupleKillTG: Number(statObj.stats.decupleKillTG),
		discDmgACCAvg: Number(statObj.stats.discDmgACCAvg),
		discDmgHitsTG: Number(statObj.stats.discDmgHitsTG),
		discKillAirTG: Number(statObj.stats.discKillAirTG),
		discKillSVMax: Number(statObj.stats.discKillSVMax),
		discKillVVMax: Number(statObj.stats.discKillVVMax),
		discMADistMax: Number(statObj.stats.discMADistMax),
		flagTimeMinTG: Number(statObj.stats.flagTimeMinTG),
		grenadeACCAvg: Number(statObj.stats.grenadeACCAvg),
		grenadeHitsTG: Number(statObj.stats.grenadeHitsTG),
		groundKillsTG: Number(statObj.stats.groundKillsTG),
		groundTimeAvg: Number(statObj.stats.groundTimeAvg),
		hGrenadeComTG: Number(statObj.stats.hGrenadeComTG),
		hGrenadeDmgTG: Number(statObj.stats.hGrenadeDmgTG),
		hitHeadBackTG: Number(statObj.stats.hitHeadBackTG),
		hitHeadLeftTG: Number(statObj.stats.hitHeadLeftTG),
		hitLegBackLTG: Number(statObj.stats.hitLegBackLTG),
		hitLegBackRTG: Number(statObj.stats.hitLegBackRTG),
		impactKillsTG: Number(statObj.stats.impactKillsTG),
		killStreakMax: Number(statObj.stats.killStreakMax),
		laserDeathsTG: Number(statObj.stats.laserDeathsTG),
		laserHitSVMax: Number(statObj.stats.laserHitSVMax),
		laserHitVVMax: Number(statObj.stats.laserHitVVMax),
		mineKillAirTG: Number(statObj.stats.mineKillAirTG),
		mineKillVVMax: Number(statObj.stats.mineKillVVMax),
		mineMADistMax: Number(statObj.stats.mineMADistMax),
		missileACCAvg: Number(statObj.stats.missileACCAvg),
		missileHitsTG: Number(statObj.stats.missileHitsTG),
		mortarAoeMATG: Number(statObj.stats.mortarAoeMATG),
		mortarKillsTG: Number(statObj.stats.mortarKillsTG),
		mortarScoreTG: Number(statObj.stats.mortarScoreTG),
		nonupleKillTG: Number(statObj.stats.nonupleKillTG),
		nuclearKillTG: Number(statObj.stats.nuclearKillTG),
		octupleKillTG: Number(statObj.stats.octupleKillTG),
		onTargetHitTG: Number(statObj.stats.onTargetHitTG),
		onTargetMisTG: Number(statObj.stats.onTargetMisTG),
		plasmaAoeMATG: Number(statObj.stats.plasmaAoeMATG),
		plasmaKillsTG: Number(statObj.stats.plasmaKillsTG),
		plasmaScoreTG: Number(statObj.stats.plasmaScoreTG),
		satchelACCAvg: Number(statObj.stats.satchelACCAvg),
		satchelHitsTG: Number(statObj.stats.satchelHitsTG),
		shockDeathsTG: Number(statObj.stats.shockDeathsTG),
		shockHitSVMax: Number(statObj.stats.shockHitSVMax),
		shockHitVVMax: Number(statObj.stats.shockHitVVMax),
		totalWepDmgTG: Number(statObj.stats.totalWepDmgTG),
		weaponScoreTG: Number(statObj.stats.weaponScoreTG),
		blasterKillsTG: Number(statObj.stats.blasterKillsTG),
		blasterScoreTG: Number(statObj.stats.blasterScoreTG),
		cgKillAirAirTG: Number(statObj.stats.cgKillAirAirTG),
		cgKillGroundTG: Number(statObj.stats.cgKillGroundTG),
		cgShotsFiredTG: Number(statObj.stats.cgShotsFiredTG),
		discDeathAirTG: Number(statObj.stats.discDeathAirTG),
		discHitDistMax: Number(statObj.stats.discHitDistMax),
		grenadeAoeMATG: Number(statObj.stats.grenadeAoeMATG),
		grenadeKillsTG: Number(statObj.stats.grenadeKillsTG),
		grenadeScoreTG: Number(statObj.stats.grenadeScoreTG),
		groundDeathsTG: Number(statObj.stats.groundDeathsTG),
		hGrenadeACCAvg: Number(statObj.stats.hGrenadeACCAvg),
		hGrenadeHitsTG: Number(statObj.stats.hGrenadeHitsTG),
		hitHeadFrontTG: Number(statObj.stats.hitHeadFrontTG),
		hitHeadRightTG: Number(statObj.stats.hitHeadRightTG),
		hitLegFrontLTG: Number(statObj.stats.hitLegFrontLTG),
		hitLegFrontRTG: Number(statObj.stats.hitLegFrontRTG),
		hitTakenHeadTG: Number(statObj.stats.hitTakenHeadTG),
		hitTakenLegsTG: Number(statObj.stats.hitTakenLegsTG),
		impactDeathsTG: Number(statObj.stats.impactDeathsTG),
		laserKillAirTG: Number(statObj.stats.laserKillAirTG),
		laserKillSVMax: Number(statObj.stats.laserKillSVMax),
		laserKillVVMax: Number(statObj.stats.laserKillVVMax),
		laserMADistMax: Number(statObj.stats.laserMADistMax),
		maHitHeightMax: Number(statObj.stats.maHitHeightMax),
		mineDeathAirTG: Number(statObj.stats.mineDeathAirTG),
		mineHitDistMax: Number(statObj.stats.mineHitDistMax),
		minePlusDiscTG: Number(statObj.stats.minePlusDiscTG),
		missileKillsTG: Number(statObj.stats.missileKillsTG),
		missileScoreTG: Number(statObj.stats.missileScoreTG),
		mortarDeathsTG: Number(statObj.stats.mortarDeathsTG),
		mortarHitSVMax: Number(statObj.stats.mortarHitSVMax),
		mortarHitVVMax: Number(statObj.stats.mortarHitVVMax),
		onTargetAccAvg: Number(statObj.stats.onTargetAccAvg),
		onTargetHMRAvg: Number(statObj.stats.onTargetHMRAvg),
		plasmaDeathsTG: Number(statObj.stats.plasmaDeathsTG),
		plasmaHitSVMax: Number(statObj.stats.plasmaHitSVMax),
		plasmaHitVVMax: Number(statObj.stats.plasmaHitVVMax),
		satchelKillsTG: Number(statObj.stats.satchelKillsTG),
		satchelScoreTG: Number(statObj.stats.satchelScoreTG),
		septupleKillTG: Number(statObj.stats.septupleKillTG),
		sextupleKillTG: Number(statObj.stats.sextupleKillTG),
		shockKillAirTG: Number(statObj.stats.shockKillAirTG),
		shockKillSVMax: Number(statObj.stats.shockKillSVMax),
		shockKillVVMax: Number(statObj.stats.shockKillVVMax),
		shockMADistMax: Number(statObj.stats.shockMADistMax),
		statsOverWrite: Number(statObj.stats.statsOverWrite),
		aaTurretKillsTG: Number(statObj.stats.aaTurretKillsTG),
		blasterDeathsTG: Number(statObj.stats.blasterDeathsTG),
		blasterHitSVMax: Number(statObj.stats.blasterHitSVMax),
		blasterHitVVMax: Number(statObj.stats.blasterHitVVMax),
		cgDeathAirAirTG: Number(statObj.stats.cgDeathAirAirTG),
		cgDeathGroundTG: Number(statObj.stats.cgDeathGroundTG),
		discKillDistMax: Number(statObj.stats.discKillDistMax),
		elfShotsFiredTG: Number(statObj.stats.elfShotsFiredTG),
		grenadeDeathsTG: Number(statObj.stats.grenadeDeathsTG),
		grenadeHitSVMax: Number(statObj.stats.grenadeHitSVMax),
		grenadeHitVVMax: Number(statObj.stats.grenadeHitVVMax),
		hGrenadeKillsTG: Number(statObj.stats.hGrenadeKillsTG),
		hGrenadeScoreTG: Number(statObj.stats.hGrenadeScoreTG),
		hitTakenTorsoTG: Number(statObj.stats.hitTakenTorsoTG),
		hitTorsoBackLTG: Number(statObj.stats.hitTorsoBackLTG),
		hitTorsoBackRTG: Number(statObj.stats.hitTorsoBackRTG),
		killAirGroundTG: Number(statObj.stats.killAirGroundTG),
		killGroundAirTG: Number(statObj.stats.killGroundAirTG),
		laserDeathAirTG: Number(statObj.stats.laserDeathAirTG),
		laserHeadShotTG: Number(statObj.stats.laserHeadShotTG),
		laserHitDistMax: Number(statObj.stats.laserHitDistMax),
		mineKillDistMax: Number(statObj.stats.mineKillDistMax),
		missileDeathsTG: Number(statObj.stats.missileDeathsTG),
		missileHitSVMax: Number(statObj.stats.missileHitSVMax),
		missileHitVVMax: Number(statObj.stats.missileHitVVMax),
		mortarDmgACCAvg: Number(statObj.stats.mortarDmgACCAvg),
		mortarDmgHitsTG: Number(statObj.stats.mortarDmgHitsTG),
		mortarKillAirTG: Number(statObj.stats.mortarKillAirTG),
		mortarKillSVMax: Number(statObj.stats.mortarKillSVMax),
		mortarKillVVMax: Number(statObj.stats.mortarKillVVMax),
		mortarMADistMax: Number(statObj.stats.mortarMADistMax),
		plasmaDmgACCAvg: Number(statObj.stats.plasmaDmgACCAvg),
		plasmaDmgHitsTG: Number(statObj.stats.plasmaDmgHitsTG),
		plasmaKillAirTG: Number(statObj.stats.plasmaKillAirTG),
		plasmaKillSVMax: Number(statObj.stats.plasmaKillSVMax),
		plasmaKillVVMax: Number(statObj.stats.plasmaKillVVMax),
		plasmaMADistMax: Number(statObj.stats.plasmaMADistMax),
		quadrupleKillTG: Number(statObj.stats.quadrupleKillTG),
		quintupleKillTG: Number(statObj.stats.quintupleKillTG),
		satchelDeathsTG: Number(statObj.stats.satchelDeathsTG),
		satchelHitVVMax: Number(statObj.stats.satchelHitVVMax),
		shockDeathAirTG: Number(statObj.stats.shockDeathAirTG),
		shockHitDistMax: Number(statObj.stats.shockHitDistMax),
		shockRearShotTG: Number(statObj.stats.shockRearShotTG),
		aaTurretDeathsTG: Number(statObj.stats.aaTurretDeathsTG),
		blasterKillAirTG: Number(statObj.stats.blasterKillAirTG),
		blasterKillSVMax: Number(statObj.stats.blasterKillSVMax),
		blasterKillVVMax: Number(statObj.stats.blasterKillVVMax),
		blasterMADistMax: Number(statObj.stats.blasterMADistMax),
		deathAirGroundTG: Number(statObj.stats.deathAirGroundTG),
		deathGroundAirTG: Number(statObj.stats.deathGroundAirTG),
		discKillAirAirTG: Number(statObj.stats.discKillAirAirTG),
		discKillGroundTG: Number(statObj.stats.discKillGroundTG),
		discShotsFiredTG: Number(statObj.stats.discShotsFiredTG),
		elfTurretKillsTG: Number(statObj.stats.elfTurretKillsTG),
		explosionKillsTG: Number(statObj.stats.explosionKillsTG),
		grenadeDmgACCAvg: Number(statObj.stats.grenadeDmgACCAvg),
		grenadeDmgHitsTG: Number(statObj.stats.grenadeDmgHitsTG),
		grenadeKillAirTG: Number(statObj.stats.grenadeKillAirTG),
		grenadeKillSVMax: Number(statObj.stats.grenadeKillSVMax),
		grenadeKillVVMax: Number(statObj.stats.grenadeKillVVMax),
		grenadeMADistMax: Number(statObj.stats.grenadeMADistMax),
		hGrenadeDeathsTG: Number(statObj.stats.hGrenadeDeathsTG),
		hGrenadeHitSVMax: Number(statObj.stats.hGrenadeHitSVMax),
		hGrenadeHitVVMax: Number(statObj.stats.hGrenadeHitVVMax),
		hitTorsoFrontLTG: Number(statObj.stats.hitTorsoFrontLTG),
		hitTorsoFrontRTG: Number(statObj.stats.hitTorsoFrontRTG),
		laserKillDistMax: Number(statObj.stats.laserKillDistMax),
		lightningKillsTG: Number(statObj.stats.lightningKillsTG),
		mineKillAirAirTG: Number(statObj.stats.mineKillAirAirTG),
		mineKillGroundTG: Number(statObj.stats.mineKillGroundTG),
		mineShotsFiredTG: Number(statObj.stats.mineShotsFiredTG),
		missileKillAirTG: Number(statObj.stats.missileKillAirTG),
		missileKillSVMax: Number(statObj.stats.missileKillSVMax),
		missileKillVVMax: Number(statObj.stats.missileKillVVMax),
		missileMADistMax: Number(statObj.stats.missileMADistMax),
		mortarDeathAirTG: Number(statObj.stats.mortarDeathAirTG),
		mortarHitDistMax: Number(statObj.stats.mortarHitDistMax),
		plasmaDeathAirTG: Number(statObj.stats.plasmaDeathAirTG),
		plasmaHitDistMax: Number(statObj.stats.plasmaHitDistMax),
		satchelKillAirTG: Number(statObj.stats.satchelKillAirTG),
		satchelKillVVMax: Number(statObj.stats.satchelKillVVMax),
		shockKillDistMax: Number(statObj.stats.shockKillDistMax),
		weaponHitDistMax: Number(statObj.stats.weaponHitDistMax),
		MidairflagGrabsTG: Number(statObj.stats.MidairflagGrabsTG),
		blasterDeathAirTG: Number(statObj.stats.blasterDeathAirTG),
		blasterHitDistMax: Number(statObj.stats.blasterHitDistMax),
		cgKillAirGroundTG: Number(statObj.stats.cgKillAirGroundTG),
		cgKillGroundAirTG: Number(statObj.stats.cgKillGroundAirTG),
		discDeathAirAirTG: Number(statObj.stats.discDeathAirAirTG),
		discDeathGroundTG: Number(statObj.stats.discDeathGroundTG),
		doubleChainKillTG: Number(statObj.stats.doubleChainKillTG),
		elfTurretDeathsTG: Number(statObj.stats.elfTurretDeathsTG),
		explosionDeathsTG: Number(statObj.stats.explosionDeathsTG),
		grenadeDeathAirTG: Number(statObj.stats.grenadeDeathAirTG),
		grenadeHitDistMax: Number(statObj.stats.grenadeHitDistMax),
		hGrenadeKillAirTG: Number(statObj.stats.hGrenadeKillAirTG),
		hGrenadeKillSVMax: Number(statObj.stats.hGrenadeKillSVMax),
		hGrenadeKillVVMax: Number(statObj.stats.hGrenadeKillVVMax),
		hGrenadeMADistMax: Number(statObj.stats.hGrenadeMADistMax),
		laserKillAirAirTG: Number(statObj.stats.laserKillAirAirTG),
		laserKillGroundTG: Number(statObj.stats.laserKillGroundTG),
		laserShotsFiredTG: Number(statObj.stats.laserShotsFiredTG),
		lightningDeathsTG: Number(statObj.stats.lightningDeathsTG),
		lightningMAHitsTG: Number(statObj.stats.lightningMAHitsTG),
		mineDeathAirAirTG: Number(statObj.stats.mineDeathAirAirTG),
		mineDeathGroundTG: Number(statObj.stats.mineDeathGroundTG),
		missileDeathAirTG: Number(statObj.stats.missileDeathAirTG),
		missileHitDistMax: Number(statObj.stats.missileHitDistMax),
		mortarKillDistMax: Number(statObj.stats.mortarKillDistMax),
		outOfBoundKillsTG: Number(statObj.stats.outOfBoundKillsTG),
		plasmaKillDistMax: Number(statObj.stats.plasmaKillDistMax),
		satchelDeathAirTG: Number(statObj.stats.satchelDeathAirTG),
		satchelHitDistMax: Number(statObj.stats.satchelHitDistMax),
		shockKillAirAirTG: Number(statObj.stats.shockKillAirAirTG),
		shockKillGroundTG: Number(statObj.stats.shockKillGroundTG),
		shockShotsFiredTG: Number(statObj.stats.shockShotsFiredTG),
		tankMortarKillsTG: Number(statObj.stats.tankMortarKillsTG),
		tripleChainKillTG: Number(statObj.stats.tripleChainKillTG),
		bellyTurretKillsTG: Number(statObj.stats.bellyTurretKillsTG),
		blasterKillDistMax: Number(statObj.stats.blasterKillDistMax),
		bomberBombsKillsTG: Number(statObj.stats.bomberBombsKillsTG),
		cgDeathAirGroundTG: Number(statObj.stats.cgDeathAirGroundTG),
		cgDeathGroundAirTG: Number(statObj.stats.cgDeathGroundAirTG),
		decupleChainKillTG: Number(statObj.stats.decupleChainKillTG),
		grenadeKillDistMax: Number(statObj.stats.grenadeKillDistMax),
		hGrenadeDeathAirTG: Number(statObj.stats.hGrenadeDeathAirTG),
		hGrenadeHitDistMax: Number(statObj.stats.hGrenadeHitDistMax),
		hitTakenHeadBackTG: Number(statObj.stats.hitTakenHeadBackTG),
		hitTakenHeadLeftTG: Number(statObj.stats.hitTakenHeadLeftTG),
		hitTakenLegBackLTG: Number(statObj.stats.hitTakenLegBackLTG),
		hitTakenLegBackRTG: Number(statObj.stats.hitTakenLegBackRTG),
		killGroundGroundTG: Number(statObj.stats.killGroundGroundTG),
		laserDeathAirAirTG: Number(statObj.stats.laserDeathAirAirTG),
		laserDeathGroundTG: Number(statObj.stats.laserDeathGroundTG),
		lightningMAkillsTG: Number(statObj.stats.lightningMAkillsTG),
		minePlusDiscKillTG: Number(statObj.stats.minePlusDiscKillTG),
		missileKillDistMax: Number(statObj.stats.missileKillDistMax),
		mortarKillAirAirTG: Number(statObj.stats.mortarKillAirAirTG),
		mortarKillGroundTG: Number(statObj.stats.mortarKillGroundTG),
		mortarShotsFiredTG: Number(statObj.stats.mortarShotsFiredTG),
		nonupleChainKillTG: Number(statObj.stats.nonupleChainKillTG),
		octupleChainKillTG: Number(statObj.stats.octupleChainKillTG),
		outOfBoundDeathsTG: Number(statObj.stats.outOfBoundDeathsTG),
		plasmaKillAirAirTG: Number(statObj.stats.plasmaKillAirAirTG),
		plasmaKillGroundTG: Number(statObj.stats.plasmaKillGroundTG),
		plasmaShotsFiredTG: Number(statObj.stats.plasmaShotsFiredTG),
		satchelKillDistMax: Number(statObj.stats.satchelKillDistMax),
		shockDeathAirAirTG: Number(statObj.stats.shockDeathAirAirTG),
		shockDeathGroundTG: Number(statObj.stats.shockDeathGroundTG),
		tankMortarDeathsTG: Number(statObj.stats.tankMortarDeathsTG),
		bellyTurretDeathsTG: Number(statObj.stats.bellyTurretDeathsTG),
		blasterKillAirAirTG: Number(statObj.stats.blasterKillAirAirTG),
		blasterKillGroundTG: Number(statObj.stats.blasterKillGroundTG),
		blasterShotsFiredTG: Number(statObj.stats.blasterShotsFiredTG),
		bomberBombsDeathsTG: Number(statObj.stats.bomberBombsDeathsTG),
		deathGroundGroundTG: Number(statObj.stats.deathGroundGroundTG),
		discKillAirGroundTG: Number(statObj.stats.discKillAirGroundTG),
		discKillGroundAirTG: Number(statObj.stats.discKillGroundAirTG),
		grenadeKillAirAirTG: Number(statObj.stats.grenadeKillAirAirTG),
		grenadeKillGroundTG: Number(statObj.stats.grenadeKillGroundTG),
		grenadeShotsFiredTG: Number(statObj.stats.grenadeShotsFiredTG),
		hGrenadeKillDistMax: Number(statObj.stats.hGrenadeKillDistMax),
		hitTakenHeadFrontTG: Number(statObj.stats.hitTakenHeadFrontTG),
		hitTakenHeadRightTG: Number(statObj.stats.hitTakenHeadRightTG),
		hitTakenLegFrontLTG: Number(statObj.stats.hitTakenLegFrontLTG),
		hitTakenLegFrontRTG: Number(statObj.stats.hitTakenLegFrontRTG),
		mineKillAirGroundTG: Number(statObj.stats.mineKillAirGroundTG),
		mineKillGroundAirTG: Number(statObj.stats.mineKillGroundAirTG),
		missileKillAirAirTG: Number(statObj.stats.missileKillAirAirTG),
		missileKillGroundTG: Number(statObj.stats.missileKillGroundTG),
		missileShotsFiredTG: Number(statObj.stats.missileShotsFiredTG),
		mortarDeathAirAirTG: Number(statObj.stats.mortarDeathAirAirTG),
		mortarDeathGroundTG: Number(statObj.stats.mortarDeathGroundTG),
		mortarTurretKillsTG: Number(statObj.stats.mortarTurretKillsTG),
		nexusCampingKillsTG: Number(statObj.stats.nexusCampingKillsTG),
		plasmaDeathAirAirTG: Number(statObj.stats.plasmaDeathAirAirTG),
		plasmaDeathGroundTG: Number(statObj.stats.plasmaDeathGroundTG),
		plasmaTurretKillsTG: Number(statObj.stats.plasmaTurretKillsTG),
		satchelKillAirAirTG: Number(statObj.stats.satchelKillAirAirTG),
		satchelKillGroundTG: Number(statObj.stats.satchelKillGroundTG),
		satchelShotsFiredTG: Number(statObj.stats.satchelShotsFiredTG),
		sentryTurretKillsTG: Number(statObj.stats.sentryTurretKillsTG),
		septupleChainKillTG: Number(statObj.stats.septupleChainKillTG),
		sextupleChainKillTG: Number(statObj.stats.sextupleChainKillTG),
		tankChaingunKillsTG: Number(statObj.stats.tankChaingunKillsTG),
		vehicleSpawnKillsTG: Number(statObj.stats.vehicleSpawnKillsTG),
		blasterDeathAirAirTG: Number(statObj.stats.blasterDeathAirAirTG),
		blasterDeathGroundTG: Number(statObj.stats.blasterDeathGroundTG),
		cgKillGroundGroundTG: Number(statObj.stats.cgKillGroundGroundTG),
		discDeathAirGroundTG: Number(statObj.stats.discDeathAirGroundTG),
		discDeathGroundAirTG: Number(statObj.stats.discDeathGroundAirTG),
		grenadeDeathAirAirTG: Number(statObj.stats.grenadeDeathAirAirTG),
		grenadeDeathGroundTG: Number(statObj.stats.grenadeDeathGroundTG),
		hGrenadeKillAirAirTG: Number(statObj.stats.hGrenadeKillAirAirTG),
		hGrenadeKillGroundTG: Number(statObj.stats.hGrenadeKillGroundTG),
		hGrenadeShotsFiredTG: Number(statObj.stats.hGrenadeShotsFiredTG),
		hitTakenTorsoBackLTG: Number(statObj.stats.hitTakenTorsoBackLTG),
		hitTakenTorsoBackRTG: Number(statObj.stats.hitTakenTorsoBackRTG),
		laserKillAirGroundTG: Number(statObj.stats.laserKillAirGroundTG),
		laserKillGroundAirTG: Number(statObj.stats.laserKillGroundAirTG),
		lightningMAEVKillsTG: Number(statObj.stats.lightningMAEVKillsTG),
		mineDeathAirGroundTG: Number(statObj.stats.mineDeathAirGroundTG),
		mineDeathGroundAirTG: Number(statObj.stats.mineDeathGroundAirTG),
		missileDeathAirAirTG: Number(statObj.stats.missileDeathAirAirTG),
		missileDeathGroundTG: Number(statObj.stats.missileDeathGroundTG),
		missileTurretKillsTG: Number(statObj.stats.missileTurretKillsTG),
		mortarTurretDeathsTG: Number(statObj.stats.mortarTurretDeathsTG),
		nexusCampingDeathsTG: Number(statObj.stats.nexusCampingDeathsTG),
		plasmaTurretDeathsTG: Number(statObj.stats.plasmaTurretDeathsTG),
		quadrupleChainKillTG: Number(statObj.stats.quadrupleChainKillTG),
		quintupleChainKillTG: Number(statObj.stats.quintupleChainKillTG),
		satchelDeathAirAirTG: Number(statObj.stats.satchelDeathAirAirTG),
		sentryTurretDeathsTG: Number(statObj.stats.sentryTurretDeathsTG),
		shockKillAirGroundTG: Number(statObj.stats.shockKillAirGroundTG),
		shockKillGroundAirTG: Number(statObj.stats.shockKillGroundAirTG),
		shrikeBlasterKillsTG: Number(statObj.stats.shrikeBlasterKillsTG),
		tankChaingunDeathsTG: Number(statObj.stats.tankChaingunDeathsTG),
		vehicleSpawnDeathsTG: Number(statObj.stats.vehicleSpawnDeathsTG),
		cgDeathGroundGroundTG: Number(statObj.stats.cgDeathGroundGroundTG),
		hGrenadeDeathAirAirTG: Number(statObj.stats.hGrenadeDeathAirAirTG),
		hGrenadeDeathGroundTG: Number(statObj.stats.hGrenadeDeathGroundTG),
		hitTakenTorsoFrontLTG: Number(statObj.stats.hitTakenTorsoFrontLTG),
		hitTakenTorsoFrontRTG: Number(statObj.stats.hitTakenTorsoFrontRTG),
		laserDeathAirGroundTG: Number(statObj.stats.laserDeathAirGroundTG),
		laserDeathGroundAirTG: Number(statObj.stats.laserDeathGroundAirTG),
		missileTurretDeathsTG: Number(statObj.stats.missileTurretDeathsTG),
		mortarKillAirGroundTG: Number(statObj.stats.mortarKillAirGroundTG),
		mortarKillGroundAirTG: Number(statObj.stats.mortarKillGroundAirTG),
		plasmaKillAirGroundTG: Number(statObj.stats.plasmaKillAirGroundTG),
		plasmaKillGroundAirTG: Number(statObj.stats.plasmaKillGroundAirTG),
		shockDeathAirGroundTG: Number(statObj.stats.shockDeathAirGroundTG),
		shockDeathGroundAirTG: Number(statObj.stats.shockDeathGroundAirTG),
		shrikeBlasterDeathsTG: Number(statObj.stats.shrikeBlasterDeathsTG),
		MidairflagGrabPointsTG: Number(statObj.stats.MidairflagGrabPointsTG),
		blasterKillAirGroundTG: Number(statObj.stats.blasterKillAirGroundTG),
		blasterKillGroundAirTG: Number(statObj.stats.blasterKillGroundAirTG),
		discKillGroundGroundTG: Number(statObj.stats.discKillGroundGroundTG),
		grenadeKillAirGroundTG: Number(statObj.stats.grenadeKillAirGroundTG),
		grenadeKillGroundAirTG: Number(statObj.stats.grenadeKillGroundAirTG),
		indoorDepTurretKillsTG: Number(statObj.stats.indoorDepTurretKillsTG),
		mineKillGroundGroundTG: Number(statObj.stats.mineKillGroundGroundTG),
		missileKillAirGroundTG: Number(statObj.stats.missileKillAirGroundTG),
		missileKillGroundAirTG: Number(statObj.stats.missileKillGroundAirTG),
		mortarDeathAirGroundTG: Number(statObj.stats.mortarDeathAirGroundTG),
		mortarDeathGroundAirTG: Number(statObj.stats.mortarDeathGroundAirTG),
		plasmaDeathAirGroundTG: Number(statObj.stats.plasmaDeathAirGroundTG),
		plasmaDeathGroundAirTG: Number(statObj.stats.plasmaDeathGroundAirTG),
		satchelKillAirGroundTG: Number(statObj.stats.satchelKillAirGroundTG),
		satchelKillGroundAirTG: Number(statObj.stats.satchelKillGroundAirTG),
		blasterDeathAirGroundTG: Number(statObj.stats.blasterDeathAirGroundTG),
		blasterDeathGroundAirTG: Number(statObj.stats.blasterDeathGroundAirTG),
		discDeathGroundGroundTG: Number(statObj.stats.discDeathGroundGroundTG),
		grenadeDeathAirGroundTG: Number(statObj.stats.grenadeDeathAirGroundTG),
		grenadeDeathGroundAirTG: Number(statObj.stats.grenadeDeathGroundAirTG),
		hGrenadeKillAirGroundTG: Number(statObj.stats.hGrenadeKillAirGroundTG),
		hGrenadeKillGroundAirTG: Number(statObj.stats.hGrenadeKillGroundAirTG),
		indoorDepTurretDeathsTG: Number(statObj.stats.indoorDepTurretDeathsTG),
		laserKillGroundGroundTG: Number(statObj.stats.laserKillGroundGroundTG),
		mineDeathGroundGroundTG: Number(statObj.stats.mineDeathGroundGroundTG),
		missileDeathAirGroundTG: Number(statObj.stats.missileDeathAirGroundTG),
		missileDeathGroundAirTG: Number(statObj.stats.missileDeathGroundAirTG),
		outdoorDepTurretKillsTG: Number(statObj.stats.outdoorDepTurretKillsTG),
		satchelDeathAirGroundTG: Number(statObj.stats.satchelDeathAirGroundTG),
		satchelDeathGroundAirTG: Number(statObj.stats.satchelDeathGroundAirTG),
		shockKillGroundGroundTG: Number(statObj.stats.shockKillGroundGroundTG),
		forceFieldPowerUpKillsTG: Number(statObj.stats.forceFieldPowerUpKillsTG),
		hGrenadeDeathAirGroundTG: Number(statObj.stats.hGrenadeDeathAirGroundTG),
		hGrenadeDeathGroundAirTG: Number(statObj.stats.hGrenadeDeathGroundAirTG),
		laserDeathGroundGroundTG: Number(statObj.stats.laserDeathGroundGroundTG),
		mortarKillGroundGroundTG: Number(statObj.stats.mortarKillGroundGroundTG),
		outdoorDepTurretDeathsTG: Number(statObj.stats.outdoorDepTurretDeathsTG),
		plasmaKillGroundGroundTG: Number(statObj.stats.plasmaKillGroundGroundTG),
		shockDeathGroundGroundTG: Number(statObj.stats.shockDeathGroundGroundTG),
		blasterKillGroundGroundTG: Number(statObj.stats.blasterKillGroundGroundTG),
		forceFieldPowerUpDeathsTG: Number(statObj.stats.forceFieldPowerUpDeathsTG),
		grenadeKillGroundGroundTG: Number(statObj.stats.grenadeKillGroundGroundTG),
		missileKillGroundGroundTG: Number(statObj.stats.missileKillGroundGroundTG),
		mortarDeathGroundGroundTG: Number(statObj.stats.mortarDeathGroundGroundTG),
		plasmaDeathGroundGroundTG: Number(statObj.stats.plasmaDeathGroundGroundTG),
		satchelKillGroundGroundTG: Number(statObj.stats.satchelKillGroundGroundTG),
		blasterDeathGroundGroundTG: Number(statObj.stats.blasterDeathGroundGroundTG),
		grenadeDeathGroundGroundTG: Number(statObj.stats.grenadeDeathGroundGroundTG),
		hGrenadeKillGroundGroundTG: Number(statObj.stats.hGrenadeKillGroundGroundTG),
		missileDeathGroundGroundTG: Number(statObj.stats.missileDeathGroundGroundTG),
		satchelDeathGroundGroundTG: Number(statObj.stats.satchelDeathGroundGroundTG),
		hGrenadeDeathGroundGroundTG: Number(statObj.stats.hGrenadeDeathGroundGroundTG),
		wildRDTG: Number(statObj.stats.wildRDTG),
		wildRKTG: Number(statObj.stats.wildRKTG),
		repairsTG: Number(statObj.stats.repairsTG),
		dtTeamGame: Number(statObj.stats.dtTeamGame),
		flagCapsTG: Number(statObj.stats.flagCapsTG),
		winCountTG: Number(statObj.stats.winCountTG),
		assaultRDTG: Number(statObj.stats.assaultRDTG),
		assaultRKTG: Number(statObj.stats.assaultRKTG),
		lossCountTG: Number(statObj.stats.lossCountTG),
		roadKillsTG: Number(statObj.stats.roadKillsTG),
		teamKillsTG: Number(statObj.stats.teamKillsTG),
		genDefendsTG: Number(statObj.stats.genDefendsTG),
		genRepairsTG: Number(statObj.stats.genRepairsTG),
		grabSpeedAvg: Number(statObj.stats.grabSpeedAvg),
		grabSpeedMax: Number(statObj.stats.grabSpeedMax),
		roadDeathsTG: Number(statObj.stats.roadDeathsTG),
		tkDestroysTG: Number(statObj.stats.tkDestroysTG),
		destructionTG: Number(statObj.stats.destructionTG),
		flagDefendsTG: Number(statObj.stats.flagDefendsTG),
		flagReturnsTG: Number(statObj.stats.flagReturnsTG),
		genDestroysTG: Number(statObj.stats.genDestroysTG),
		hapcFlyerRDTG: Number(statObj.stats.hapcFlyerRDTG),
		hapcFlyerRKTG: Number(statObj.stats.hapcFlyerRKTG),
		scoreMidAirTG: Number(statObj.stats.scoreMidAirTG),
		turretKillsTG: Number(statObj.stats.turretKillsTG),
		winLostPctAvg: Number(statObj.stats.winLostPctAvg),
		InventoryDepTG: Number(statObj.stats.InventoryDepTG),
		carrierKillsTG: Number(statObj.stats.carrierKillsTG),
		defenseScoreTG: Number(statObj.stats.defenseScoreTG),
		mobileBaseRDTG: Number(statObj.stats.mobileBaseRDTG),
		mobileBaseRKTG: Number(statObj.stats.mobileBaseRKTG),
		offenseScoreTG: Number(statObj.stats.offenseScoreTG),
		scoutFlyerRDTG: Number(statObj.stats.scoutFlyerRDTG),
		scoutFlyerRKTG: Number(statObj.stats.scoutFlyerRKTG),
		solarRepairsTG: Number(statObj.stats.solarRepairsTG),
		vehicleBonusTG: Number(statObj.stats.vehicleBonusTG),
		vehicleScoreTG: Number(statObj.stats.vehicleScoreTG),
		SensorRepairsTG: Number(statObj.stats.SensorRepairsTG),
		TurretRepairsTG: Number(statObj.stats.TurretRepairsTG),
		bomberFlyerRDTG: Number(statObj.stats.bomberFlyerRDTG),
		bomberFlyerRKTG: Number(statObj.stats.bomberFlyerRKTG),
		depInvRepairsTG: Number(statObj.stats.depInvRepairsTG),
		escortAssistsTG: Number(statObj.stats.escortAssistsTG),
		scoreHeadshotTG: Number(statObj.stats.scoreHeadshotTG),
		scoreRearshotTG: Number(statObj.stats.scoreRearshotTG),
		sentryRepairsTG: Number(statObj.stats.sentryRepairsTG),
		solarDestroysTG: Number(statObj.stats.solarDestroysTG),
		PulseSensorDepTG: Number(statObj.stats.PulseSensorDepTG),
		StationRepairsTG: Number(statObj.stats.StationRepairsTG),
		capEfficiencyAvg: Number(statObj.stats.capEfficiencyAvg),
		sensorDestroysTG: Number(statObj.stats.sensorDestroysTG),
		sentryDestroysTG: Number(statObj.stats.sentryDestroysTG),
		turretDestroysTG: Number(statObj.stats.turretDestroysTG),
		MotionSensorDepTG: Number(statObj.stats.MotionSensorDepTG),
		TurretIndoorDepTG: Number(statObj.stats.TurretIndoorDepTG),
		VStationRepairsTG: Number(statObj.stats.VStationRepairsTG),
		TurretOutdoorDepTG: Number(statObj.stats.TurretOutdoorDepTG),
		depSensorRepairsTG: Number(statObj.stats.depSensorRepairsTG),
		depTurretRepairsTG: Number(statObj.stats.depTurretRepairsTG),
		iStationDestroysTG: Number(statObj.stats.iStationDestroysTG),
		vstationDestroysTG: Number(statObj.stats.vstationDestroysTG),
		depSensorDestroysTG: Number(statObj.stats.depSensorDestroysTG),
		depTurretDestroysTG: Number(statObj.stats.depTurretDestroysTG),
		mannedTurretKillsTG: Number(statObj.stats.mannedTurretKillsTG),
		depStationDestroysTG: Number(statObj.stats.depStationDestroysTG),
		mpbtstationRepairsTG: Number(statObj.stats.mpbtstationRepairsTG),
		mpbtstationDestroysTG: Number(statObj.stats.mpbtstationDestroysTG),
		dtTurretKillsTG: Number(statObj.stats.dtTurretKillsTG),
		mineDiscAccMPAvg: Number(statObj.stats.mineDiscAccMPAvg),
		mineKillAGroundAirTG: Number(statObj.stats.mineKillAGroundAirTG),
		mineKillAGroundGroundTG: Number(statObj.stats.mineKillAGroundGroundTG),
		satchelKillAGroundAirTG: Number(statObj.stats.satchelKillAGroundAirTG),
		satchelKillAGroundGroundTG: Number(statObj.stats.satchelKillAGroundGroundTG),
		mineDiscPctAvg: Number(statObj.stats.mineDiscPctAvg),
		mineDiscHitTG: Number(statObj.stats.mineDiscHitTG),
		mineDiscAccAvg: Number(statObj.stats.mineDiscAccAvg),
		mineDiscShotsTG: Number(statObj.stats.mineDiscShotsTG)
	};
}

export default formatPlayerStats;
