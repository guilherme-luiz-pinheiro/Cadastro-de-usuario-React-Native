import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [codigo, setCodigo] = useState(0);
  const [erroCodigo, setErroCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [senhaConfirma, setSenhaConfirma] = useState("");
  const [erroSenhaConfirma, setErroSenhaConfirma] = useState("");
  function ValidaCodigo() {
    if (codigo.trim() !== "" && parseInt(codigo) > 0) {
      setErroCodigo("");
      return 0;
    } else {
      setErroCodigo("Código Inválido! O código deve ser > 0.");
      return 1;
    }
  }

  function ValidaNome() {
    if (nome.trim() !== "") {
      setErroNome("");
      return 0;
    } else {
      setErroNome("O nome é obrigatório.");
      return 1;
    }
  }

  function ValidaEmail() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(email)) {
      setErroEmail("");
      return 0;
    } else {
      setErroEmail("E-mail deve ser um e-mail válido.");
      return 1;
    }
  }

  function ValidaSenha() {
    const regexSenha = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (regexSenha.test(senha)) {
      setErroSenha("");
      return 0;
    } else {
      setErroSenha("Senha deve ter ao menos 5 caracteres, 1 letra maiúscula e 1 número.");
      return 1;
    }
  }

  function ValidaSenhaConfirma() {
    if (senhaConfirma === senha && senhaConfirma.trim() !== "") {
      setErroSenhaConfirma("");
      return 0;
    } else {
      setErroSenhaConfirma("Senha e confirmação devem ser iguais.");
      return 1;
    }
  }

  async function Salva() {
    if (
      ValidaCodigo() === 0 &&
      ValidaNome() === 0 &&
      ValidaEmail() === 0 &&
      ValidaSenha() === 0 &&
      ValidaSenhaConfirma() === 0
    ) {

      let objCadastro = {
        nome: nome,
        codigo: codigo,
        email: email,
        senha: senha,
      };

      const stringJson = JSON.stringify(objCadastro);

      await AsyncStorage.setItem("@cadastro", stringJson);
      Alert.alert("Salvo com sucesso!!!");

      Alert.alert("Sucesso", "Dados salvos com sucesso!");
    } else {
      Alert.alert("Erro", "Verifique os campos e tente novamente.");
    }
  }
  async function Carrega() {
    const conteudoJson = await AsyncStorage.getItem("@cadastro");
    console.log(conteudoJson);
    if (conteudoJson != null) {
      const objContato = JSON.parse(conteudoJson);
      setNome(objContato.nome);
      setSenha(objContato.senha);
      setSenhaConfirma(objContato.senha);
      setEmail(objContato.email);
      setCodigo(objContato.codigo);
    } else {
      Alert("Não há dados cadastrados!");
    }
  }


  function Limpa() {
    setCodigo("");
    setErroCodigo("");
    setNome("");
    setErroNome("");
    setEmail("");
    setErroEmail("");
    setSenha("");
    setErroSenha("");
    setSenhaConfirma("");
    setErroSenhaConfirma("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.titulo}>Cadastro de usuário</Text>
        <View>
          <Text style={styles.textos}>Código</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.inputCodigo}
            placeholder="Digite algo..."
            value={codigo}
            onChangeText={setCodigo}
          />
          <Text style={styles.erro}>{erroCodigo}</Text>
        </View>
        <View>
          <Text style={styles.textos}>Nome</Text>
          <TextInput
            style={styles.inputNome}
            placeholder="Digite algo..."
            value={nome}
            onChangeText={setNome}
          />
          <Text style={styles.erro}>{erroNome}</Text>
        </View>
        <View>
          <Text style={styles.textos}>E-mail</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder="Digite algo..."
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.erro}>{erroEmail}</Text>
        </View>
        <View style={styles.container3}>
          <View>
            <Text style={styles.textos}>Senha</Text>
            <TextInput
              style={styles.inputSenha}
              secureTextEntry={true} // Oculta os caracteres
              placeholder="Digite algo..."
              value={senha}
              onChangeText={setSenha}
            />
          </View>
          <View style={styles.container4}>
            <Text style={styles.textos}>Confirmar Senha</Text>
            <TextInput
              style={styles.inputSenhaConfirma}
              secureTextEntry={true} // Oculta os caracteres
              placeholder="Digite algo..."
              value={senhaConfirma}
              onChangeText={setSenhaConfirma}
            />
          </View>
        </View>
        <Text style={styles.erro}>{erroSenha}</Text>
        <Text style={styles.erro}>{erroSenhaConfirma}</Text>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.botao} onPress={() => Salva()}>
          <Text style={styles.textos}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Carrega()}>
          <Text style={styles.textos}>Carregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Limpa()}>
          <Text style={styles.textos}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'Left',
    justifyContent: 'Left',
  }, container2: {
    marginTop: 60,
    marginLeft: 20,
  }, container3: {
    flexDirection: 'row',
  }, container4: {
    marginLeft: 20,
  }, inputCodigo: {
    marginTop: 10,
    backgroundColor: '#EDEDED',
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    width: 100,
    height: 30,
  }, inputNome: {
    backgroundColor: '#EDEDED',
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    width: 150,
    height: 30,
  }, textos: {
    fontSize: 16,
    fontWeight: 'bold'
  }, inputEmail: {
    backgroundColor: '#EDEDED',
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    width: 150,
    height: 30,
  }, inputSenha: {
    backgroundColor: '#EDEDED',
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    width: 150,
    height: 30,
  }, inputSenhaConfirma: {
    backgroundColor: '#EDEDED',
    padding: 3,
    borderWidth: 1,
    borderRadius: 3,
    width: 150,
    height: 30,
  }, botao: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#5A9BD5',
    borderRadius: 10,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }, titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: '10%',
  }, erro: {
    color: 'red',
    fontSize: 14,
  },
});
