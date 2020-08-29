import { Column, Entity, Index, OneToMany } from 'typeorm';
import { GameDetail } from '../../game/entities/GameDetail';

@Index('game_pk', [ 'gameId' ], { unique: true })
@Entity('games', { schema: 'public' })
export class Games {
	@Column('numeric', { primary: true, name: 'game_id' })
	gameId: string;

	@Column('text', { name: 'map' })
	map: string;

	@Column('timestamp without time zone', { name: 'datestamp' })
	datestamp: Date;

	@Column('text', { name: 'gametype' })
	gametype: string;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()'
	})
	createdAt: Date;

	@OneToMany(() => GameDetail, (gameDetail) => gameDetail.game)
	gameDetails: GameDetail[];
}
