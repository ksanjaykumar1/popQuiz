import User from '../models/User';
import Logger from './logger';
import HQRepresentative from '../models/HqRepresentative';
import Branch from '../models/Branch';
import BranchRepresentative from '../models/BranchRepresentative';
import Asset from '../models/Asset';

import hqRepresentativeJSON from '../mockData/hQRepresentative.json';
import branch1JSON from '../mockData/branch1.json';
import branch1Rep1RepresentativeJSON from '../mockData/branch1Rep1.json';
import branch2JSON from '../mockData/branch2.json';
import branch2Rep1RepresentativeJSON from '../mockData/branch2Rep1.json';
import assetsJSON from '../mockData/assets.json';

const setup = async () => {
  // If no user are recorded then add data
  const isFirstAccount = (await User.countDocuments({})) === 0;
  if (!isFirstAccount) {
    Logger.info('DB data was setup completed', isFirstAccount);
  } else {
    // Enroll HQ Admin
    let hqRep = await User.create({ ...hqRepresentativeJSON });
    await HQRepresentative.create({ user: hqRep._id });

    // Enroll two branches
    let branch1 = await Branch.create({ ...branch1JSON });
    let branch2 = await Branch.create({ ...branch2JSON });

    // Enroll one representative from each of the two branches
    let branch1Rep1 = await User.create({ ...branch1Rep1RepresentativeJSON });
    await BranchRepresentative.create({
      ...branch1Rep1RepresentativeJSON,
      userId: branch1Rep1._id,
      branchId: branch1._id,
    });
    let branch2Rep1 = await User.create({ ...branch2Rep1RepresentativeJSON });
    await BranchRepresentative.create({
      ...branch2Rep1RepresentativeJSON,
      userId: branch2Rep1._id,
      branchId: branch2._id,
    });
    // Adding assets with owner as HQ Representative
    assetsJSON.map(async (asset) => {
      await Asset.create({ ...asset, ownerId: hqRep._id });
    });
    Logger.info('DB data is successfully setup');
  }
};

export default setup;
