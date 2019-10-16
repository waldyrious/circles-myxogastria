import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import BackButton from '~/components/BackButton';
import ButtonPrimary from '~/components/ButtonPrimary';
import Header from '~/components/Header';
import View from '~/components/View';
import notify, { NotificationsTypes } from '~/store/notifications/actions';
import { restoreAccount } from '~/store/onboarding/actions';

const AccountImport = (props, context) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const dispatch = useDispatch();

  const onChange = event => {
    setSeedPhrase(event.target.value);
  };

  const onClick = async () => {
    try {
      await dispatch(restoreAccount(seedPhrase));

      dispatch(
        notify({
          text: context.t('AccountImport.welcomeMessage'),
        }),
      );
    } catch {
      dispatch(
        notify({
          text: context.t('AccountImport.errorMessage'),
          type: NotificationsTypes.ERROR,
        }),
      );
    }
  };

  return (
    <Fragment>
      <Header>
        <BackButton isDark to="/welcome/connect" />
      </Header>

      <View isHeader>
        <h1>{context.t('AccountImport.connectToYourWallet')}</h1>
        <p>{context.t('AccountImport.enterYourSeedPhrase')}</p>

        <textarea value={seedPhrase} onChange={onChange} />

        <p>
          {context.t('AccountImport.lostYourSeedPhrase')}{' '}
          <Link to="/welcome/new">
            {context.t('AccountImport.createNewWallet')}
          </Link>
        </p>

        <p>
          {context.t('AccountImport.questions')}{' '}
          <a href="#">{context.t('AccountImport.contactUs')}</a>
        </p>

        <ButtonPrimary disabled={seedPhrase.length === 0} onClick={onClick}>
          {context.t('AccountImport.submit')}
        </ButtonPrimary>
      </View>
    </Fragment>
  );
};

AccountImport.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default AccountImport;
