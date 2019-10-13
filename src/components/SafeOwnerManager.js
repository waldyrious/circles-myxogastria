import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import ButtonPrimary from '~/components/ButtonPrimary';
import { removeSafeOwner, getSafeOwners } from '~/store/safe/actions';

const SafeOwnerManager = (props, context) => {
  const safe = useSelector(state => state.safe);
  const dispatch = useDispatch();

  const isDisabled = safe.nonce !== null;

  useEffect(() => {
    dispatch(getSafeOwners());
  }, []);

  return (
    <Fragment>
      <ul>
        <SafeOwnerManagerList owners={safe.owners} />
      </ul>

      <ButtonPrimary disabled={isDisabled} to="/settings/keys/add">
        {context.t('SafeOwnerManager.addNewDevice')}
      </ButtonPrimary>
    </Fragment>
  );
};

const SafeOwnerManagerList = props => {
  return props.owners.map(address => {
    return <SafeOwnerManagerItem address={address} key={address} />;
  });
};

const SafeOwnerManagerItem = (props, context) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeSafeOwner(props.address));
  };

  return (
    <li>
      {props.address}

      <Button onClick={onRemove}>{context.t('SafeOwnerManager.remove')}</Button>
    </li>
  );
};

SafeOwnerManagerList.propTypes = {
  owners: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SafeOwnerManagerItem.propTypes = {
  address: PropTypes.string.isRequired,
};

SafeOwnerManager.contextTypes = {
  t: PropTypes.func.isRequired,
};

SafeOwnerManagerItem.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SafeOwnerManager;
