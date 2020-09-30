import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Games } from '../games/entities/Games';
import { GameDetail } from './entities/GameDetail';

import formatPlayerStats from '../common/util/formatStats';

@Injectable()
export class GameService {
  constructor(
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    @InjectRepository(Games)
    private readonly gamesRepository: Repository<Games>,
    @InjectRepository(GameDetail)
    private readonly gameRepository: Repository<GameDetail>,
  ) {}

  async findOne(gameId: string) {
    const query = await this.gameRepository.find({
      relations: ['game', 'playerGuid'],
      where: [{ game: { gameId: gameId } }],
    });

    if (!query.length) {
      throw new NotFoundException(`Game ID: ${gameId} not found`);
    }

    const game: any = {
      ...query[0].game,
    };

    // Need to set return based off gameType
    // Modify game object if not a CTF type game and return early
    if (query[0].gametype !== 'CTFGame' && query[0].gametype !== 'SCtFGame') {
      game['players'] = [];
      for (const player of query) {
        const { playerName } = player;
        const stats = formatPlayerStats(player);

        const p = {
          playerGuid: player.playerGuid.playerGuid,
          playerName,
          stats,
        };

        game.players.push(p);
      }

      return game;
    }

    // Team Based game stats  (CTF/SCtF)
    game['teams'] = {
      obs: { score: 0, players: [] },
      storm: { score: 0, players: [] },
      inferno: { score: 0, players: [] },
    };

    const teamZero = [],
      teamOne = [],
      teamTwo = [];

    for (const player of query) {
      const { playerName } = player;
      const stats = formatPlayerStats(player);

      const p = {
        playerGuid: player.playerGuid.playerGuid,
        playerName,
        stats,
      };

      if (isNaN(player.stats.teamScoreGame)) {
        // legacy calculations for game totals (not using the new teamScoreGame attribute)
        const flagGrabsTG = parseInt(player.stats.flagGrabsTG[0]);
        const flagCapsTG = parseInt(player.stats.flagCapsTG[0]) * 100;
        const totalFlagScore = flagGrabsTG + flagCapsTG;

        if (player.stats.dtTeamGame[0] === '1') {
          // Storm
          game.teams.storm.score += totalFlagScore;
          teamOne.push(p);
        } else if (player.stats.dtTeamGame[0] === '2') {
          // Inferno
          game.teams.inferno.score += totalFlagScore;
          teamTwo.push(p);
        } else {
          // OBS
          game.teams.obs.score += totalFlagScore;
          teamZero.push(p);
        }
      } else {
        // Use new player.stats.teamScoreGame key
        if (player.stats.dtTeamGame[0] === '1') {
          // Storm
          game.teams.storm.score = Number(player.stats.teamScoreGame);
          teamOne.push(p);
        } else if (player.stats.dtTeamGame[0] === '2') {
          // Inferno
          game.teams.inferno.score = Number(player.stats.teamScoreGame);
          teamTwo.push(p);
        } else {
          // OBS
          game.teams.obs.score = Number(player.stats.teamScoreGame);
          teamZero.push(p);
        }
      }
    }

    game['teams']['obs']['players'] = teamZero.sort(
      (a, b) => b.stats.scoreTG - a.stats.scoreTG,
    );
    game['teams']['storm']['players'] = teamOne.sort(
      (a, b) => b.stats.scoreTG - a.stats.scoreTG,
    );
    game['teams']['inferno']['players'] = teamTwo.sort(
      (a, b) => b.stats.scoreTG - a.stats.scoreTG,
    );

    return game;
  }

  async findOneAbvSummary(gameId: string) {
    const query = await this.gameRepository.find({
      relations: ['game', 'playerGuid'],
      where: [{ game: { gameId: gameId } }],
    });

    if (!query.length) {
      throw new NotFoundException(`Game ID: ${gameId} not found`);
    }

    const game: any = {
      ...query[0].game,
    };

    // Need to set return based off gameType
    // Modify game object if not a CTF type game and return early
    if (query[0].gametype !== 'CTFGame' && query[0].gametype !== 'SCtFGame') {
      game['totalScore'] = 0;

      for (const player of query) {
        const stats = formatPlayerStats(player);

        game.totalScore += stats.scoreTG;
      }

      return game;
    }

    // Team Based game stats  (CTF/SCtF)
    game['teams'] = {
      obs: { score: 0, playerCount: 0 },
      storm: { score: 0, playerCount: 0 },
      inferno: { score: 0, playerCount: 0 },
    };

    console.log(query);

    for (const player of query) {
      const flagGrabsTG = parseInt(player.stats.flagGrabsTG[0]);
      const flagCapsTG = parseInt(player.stats.flagCapsTG[0]) * 100;
      const totalFlagScore = flagGrabsTG + flagCapsTG;

      if (player.stats.dtTeamGame[0] === '1') {
        // Storm
        game.teams.storm.score += totalFlagScore;
        game.teams.storm.playerCount += 1;
      } else if (player.stats.dtTeamGame[0] === '2') {
        // Inferno
        game.teams.inferno.score += totalFlagScore;
        game.teams.inferno.playerCount += 1;
      } else {
        // OBS
        game.teams.obs.score += totalFlagScore;
        game.teams.obs.playerCount += 1;
      }
    }
    game['totalScore'] =
      game.teams.storm.score + game.teams.inferno.score + game.teams.obs.score;

    return game;
  }
}
