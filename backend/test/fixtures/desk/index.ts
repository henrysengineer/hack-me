import { DeskType } from '../../../src/api/desks/interface';
import { Desk } from '../../../src/api/desks/entities/desk.entity';

export const MahoganyDesk: Desk = {
    deskId: 1,
    occupancy: 2,
    type: DeskType.MAHOGANY
};

export const ExecutiveLeatherDesk: Desk = {
    deskId: 2,
    occupancy: 1,
    type: DeskType.EXECUTIVE_LEATHER
};

export const SteelDesk: Desk = {
    deskId: 3,
    occupancy: 3,
    type: DeskType.STEEL
};
