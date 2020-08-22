import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Games } from './Games';
import { Players } from '../../entities/Players';

@Index('games_pk', [ 'id' ], { unique: true })
@Index('game_detail_uuid_key', [ 'uuid' ], { unique: true })
@Entity('game_detail', { schema: 'public' })
export class GameDetail {
	@PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
	id: number;

	@Column('text', { name: 'player_name' })
	playerName: string;

	@Column('numeric', { name: 'stat_overwrite' })
	statOverwrite: string;

	@Column('text', { name: 'map' })
	map: string;

	@Column('jsonb', { name: 'stats' })
	stats: any;

	@Column('timestamp without time zone', { name: 'datestamp' })
	datestamp: Date;

	@Column('text', { name: 'uuid', unique: true })
	uuid: string;

	@Column('text', { name: 'gametype' })
	gametype: string;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()'
	})
	createdAt: Date;

	// @ManyToOne(() => Games, (games) => games.gameDetails)
	// @JoinColumn([ { name: 'game_id', referencedColumnName: 'gameId' } ])
	// game: Games;

	@ManyToOne(() => Players, (players) => players.gameDetails)
	@JoinColumn([ { name: 'player_guid', referencedColumnName: 'playerGuid' } ])
	playerGuid: Players;
}
