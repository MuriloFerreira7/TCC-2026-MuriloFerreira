# Cadastro
**Ator:** Usuário

**Descrição:** Permite ao usuário criar uma conta para acessar o sistema

**Fluxo Principal:**  
*1.* Usuário informa dados(e-mail, nome de usuário, senha)  
*2.* Sistema valida formato dos dados  
*3.* Sistema verifica se já existe conta com o email ou nome informado  
*4.* Sistema cria a conta
*5.* Sistema informa sucesso  

**Fluxos alternativos:**  
*2a.* Dados inválidos (campo vazio ou formato incorreto) -> Sistema informa erro e solicita correção  
*3a.* Conta já existente -> Sistema informa que a conta já existe e sugere login  