import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button,
  Image, Dimensions,
  ScrollView, Linking,
  StatusBar, FlatList
} from 'react-native';

import CardView from './components/CardView';
import Navigator from './screens';

const MINHA_IMAGEM = 'https://img.elo7.com.br/product/original/115E580/painel-paisagem-g-frete-gratis-decoracao-de-festa.jpg';

const DADOS = [{
  id: 1,
  titulo: 'Lorem Ipsum',
  imagem: {
    uri: MINHA_IMAGEM
  },
  subTitulo: 'O que é Lorem Ipsum?',
  conteudo: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
}, {
  id: 2,
  titulo: 'Corinthians',
  imagem: require('./assets/corinthians.jpg'),
  subTitulo: "Aqui é Corinthians",
  conteudo: `Salve o Corinthians.
  O campeão dos campeões.
  Eternamente dentro dos nossos corações.
  Salve o Corinthians de tradições e glórias mil.
  Tu és orgulho.
  Dos desportistas do Brasil.`
}, {
  id: 3,
  titulo: 'Lorem Ipsum',
  imagem: {
    uri: MINHA_IMAGEM
  },
  subTitulo: 'O que é Lorem Ipsum?',
  conteudo: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.',
}];

export default class App extends Component {

  renderItem = (record) => {
    const { item, index } = record;

    return (
      <CardView
        imagem={item.imagem}
        onPress={null}
        titulo={item.titulo}
        subTitulo={item.subTitulo}
        conteudo={item.conteudo}
      />
    )
  }

  render() {
    return (
      // <ScrollView>
      //   <StatusBar backgroundColor="#c79100" barStyle="dark-content" />
      //   {/* <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" /> */}
      //   {/* <StatusBar hidden /> */}

      //   <CardView
      //     imagem={{ uri: MINHA_IMAGEM }}
      //     onPress={() => Linking.openURL('geo:-24.050334,-52.3767293?z=16')}
      //     titulo="Lorem Ipsum"
      //     subTitulo="O que é Lorem Ipsum?"
      //     conteudo="Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos."
      //   />

      //   <CardView
      //     imagem={require('./assets/corinthians.jpg')}
      //     onPress={() => Linking.openURL('http://www.corinthians.com.br')}
      //     titulo="Corinthians"
      //     subTitulo="Aqui é curintia"
      //     conteudo="Salve o Corinthians.
      //     O campeão dos campeões.
      //     Eternamente dentro dos nossos corações.
      //     Salve o Corinthians de tradições e glórias mil.
      //     Tu és orgulho.
      //     Dos desportistas do Brasil."
      //   />
      // </ScrollView>
      // <View>
      //   <StatusBar backgroundColor="#c78f00" barStyle="dark-content" />

      //   <FlatList
      //     data={DADOS}
      //     renderItem={this.renderItem}
      //     keyExtractor={item => String(item.id)}
      //   />
      // </View>
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  minhaImagem: {
    height: 300,
    width: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
