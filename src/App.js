import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Modules from './components/modules/Modules';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authentication/authState';

import ModuleState from './context/modules/moduleState'
import SectionState from './context/sections/sectionState';

import tokenAuth from './config/tokenAuth';
// validar sesion con ruta privada
import RoutePrivate from './components/routes/routePrivate';
import SettingsState from './context/settings/settingsState';

import NewUserState from './context/newUsers/newUserState';
import UsersState from './context/users/usersState';
import TemplateState from './context/templates/templateState';

import FormatoState from './context/formatos/formatoState';
import ZonaState from './context/zonas/zonaState';

import ItemsState from './context/items/itemsState';
import PropertyState from './context/properties/propertyState';
import FormItemsState from './context/formItems/formItemsState';
import ClientsState from './context/clients/clientsState';
import InspectorsState from './context/inspectors/inspectorsState';
import FormsState from './context/forms/formsState';
import FileState from './context/files/fileState';

const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ModuleState>
      <SectionState>
        <AlertState>
          <AuthState>
            <NewUserState>
              <UsersState>
                <ZonaState>
                  <FormatoState>
                    <Router>
                      <Switch>
                        <SettingsState>
                          <TemplateState>
                            <ItemsState>
                              <FormItemsState>
                                <PropertyState>
                                  <ClientsState>
                                    <InspectorsState>
                                      <FileState>
                                        <FormsState>
                                          <Route exact path="/" component={Login}/>
                                          <Route exact path="/new-account" component={NewAccount}/>
                                          <RoutePrivate exact path="/modules" component={Modules}/>
                                        </FormsState>
                                      </FileState>
                                    </InspectorsState>
                                  </ClientsState>
                                </PropertyState>
                              </FormItemsState>
                            </ItemsState>
                          </TemplateState>
                        </SettingsState>
                      </Switch>
                    </Router>
                  </FormatoState>
                </ZonaState>
              </UsersState>
            </NewUserState>
          </AuthState>
        </AlertState>
      </SectionState>
    </ModuleState>
  );
}

export default App;
