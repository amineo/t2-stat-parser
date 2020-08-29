import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameDetail } from '../../game/entities/GameDetail';

@Index('players_pk', [ 'playerGuid' ], { unique: true })
@Index('players_player_name_key', [ 'playerName' ], { unique: true })
@Index('players_uuid_key', [ 'uuid' ], { unique: true })
@Entity('players', { schema: 'public' })
export class Players {
	// @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
	// id: number;

	@Column('numeric', { primary: true, name: 'player_guid' })
	playerGuid: string;

	@Column('text', { name: 'player_name', unique: true })
	playerName: string;

	@Column('numeric', { name: 'total_games_ctfgame', default: () => '0' })
	totalGamesCtfgame: string;

	@Column('numeric', { name: 'total_games_dmgame', default: () => '0' })
	totalGamesDmgame: string;

	@Column('numeric', { name: 'total_games_lakrabbitgame', default: () => '0' })
	totalGamesLakrabbitgame: string;

	@Column('numeric', { name: 'total_games_sctfgame', default: () => '0' })
	totalGamesSctfgame: string;

	@Column('numeric', { name: 'stat_overwrite_ctfgame', select: false, default: () => '0' })
	statOverwriteCtfgame: string;

	@Column('numeric', { name: 'stat_overwrite_dmgame', select: false, default: () => '0' })
	statOverwriteDmgame: string;

	@Column('numeric', {
		name: 'stat_overwrite_lakrabbitgame',
		select: false,
		default: () => '0'
	})
	statOverwriteLakrabbitgame: string;

	@Column('numeric', { name: 'stat_overwrite_sctfgame', select: false, default: () => '0' })
	statOverwriteSctfgame: string;

	@Column('text', { name: 'uuid', unique: true })
	uuid: string;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()'
	})
	createdAt: Date;

	@Column('timestamp with time zone', {
		name: 'updated_at',
		default: () => 'now()'
	})
	updatedAt: Date;

	@OneToMany(() => GameDetail, (gameDetail) => gameDetail.playerGuid)
	gameDetails: GameDetail[];
}
