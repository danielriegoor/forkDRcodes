 ## Instalação Python Standalone
 
 ** Instalando unicamente a dependência Phython (Caso você tenha optado por não marcar a opção no passo ## 2)

 ## Como Instalar o Python

Instalar o Python é um processo relativamente simples, e a forma mais recomendada é através do **instalador oficial** para o seu sistema operacional. Abaixo, detalharemos os passos para Windows, macOS e Linux.

-----

### Instalação no Windows

1.  **Baixe o Instalador:**

      * Acesse o site oficial do Python: [https://www.python.org/downloads/](https://www.python.org/downloads/)
      * Clique no botão amarelo que diz "Download Python X.X.X" (onde X.X.X é a versão mais recente). O instalador correto para o seu sistema (32-bit ou 64-bit) será baixado automaticamente.

2.  **Execute o Instalador:**

      * Localize o arquivo baixado (geralmente na pasta "Downloads") e dê um **clique duplo** nele.
      * Uma janela do instalador será aberta.

3.  **Configurações Importantes:**

      * Na primeira tela do instalador, **é crucial marcar a caixa "Add python.exe to PATH"**. Isso permite que você execute Python a partir do terminal (prompt de comando) de qualquer diretório.
      * Você pode escolher entre "Install Now" (instalação padrão, recomendada para a maioria dos usuários) ou "Customize installation" (para usuários mais avançados que desejam alterar diretórios de instalação ou componentes). Para a maioria dos casos, "Install Now" é suficiente.

4.  **Conclua a Instalação:**

      * Clique em "Install Now" e siga as instruções na tela. O processo pode levar alguns minutos.
      * Ao final, você verá uma mensagem indicando que a instalação foi bem-sucedida.

5.  **Verifique a Instalação:**

      * Abra o **Prompt de Comando** (pesquise por "cmd" no menu Iniciar).
      * Digite `python --version` e pressione Enter. Você deverá ver a versão do Python instalada.
      * Para verificar o gerenciador de pacotes pip, digite `pip --version`.

-----

### Instalação no macOS

1.  **Baixe o Instalador:**

      * Acesse o site oficial do Python: [https://www.python.org/downloads/](https://www.python.org/downloads/)
      * Clique no botão amarelo "Download Python X.X.X". O arquivo `.pkg` será baixado.

2.  **Execute o Instalador:**

      * Localize o arquivo `.pkg` baixado e dê um **clique duplo** nele.
      * O instalador do macOS será iniciado.

3.  **Siga as Instruções:**

      * Siga os passos do instalador, clicando em "Continuar", "Concordar" (com os termos de licença) e "Instalar".
      * Você pode ser solicitado a inserir a sua senha de administrador.

4.  **Conclua a Instalação:**

      * Ao final, o instalador informará que a instalação foi bem-sucedida.

5.  **Verifique a Instalação:**

      * Abra o **Terminal** (você pode encontrá-lo em Aplicativos \> Utilitários).
      * Digite `python3 --version` e pressione Enter. Você deverá ver a versão do Python instalada. No macOS, é comum que a versão padrão do sistema seja o Python 2, então use `python3` para se referir à versão mais recente que você instalou.
      * Para verificar o gerenciador de pacotes pip, digite `pip3 --version`.

-----

### Instalação no Linux

No Linux, o Python geralmente já vem pré-instalado na maioria das distribuições. No entanto, é comum que seja uma versão mais antiga (Python 2). Para instalar ou atualizar para uma versão mais recente do Python 3, você pode usar o gerenciador de pacotes da sua distribuição.

-----

#### Para distribuições baseadas em Debian/Ubuntu:

1.  **Atualize os Pacotes:**

      * Abra o Terminal e digite:
        ```bash
        sudo apt update
        sudo apt upgrade
        ```
      * Isso garante que sua lista de pacotes está atualizada.

2.  **Instale o Python 3 (se não estiver instalado ou for uma versão antiga):**

      * ```bash
          sudo apt install python3
        ```

3.  **Instale o Pip (gerenciador de pacotes):**

      * ```bash
          sudo apt install python3-pip
        ```

4.  **Verifique a Instalação:**

      * ```bash
          python3 --version
          pip3 --version
        ```

-----

#### Para distribuições baseadas em Fedora/CentOS/RHEL:

1.  **Atualize os Pacotes:**

      * Abra o Terminal e digite:
        ```bash
        sudo dnf update
        ```
        (ou `sudo yum update` em versões mais antigas)

2.  **Instale o Python 3 (se não estiver instalado ou for uma versão antiga):**

      * ```bash
          sudo dnf install python3
        ```
        (ou `sudo yum install python3` em versões mais antigas)

3.  **Instale o Pip (gerenciador de pacotes):**

      * ```bash
          sudo dnf install python3-pip
        ```
        (ou `sudo yum install python3-pip` em versões mais antigas)

4.  **Verifique a Instalação:**

      * ```bash
          python3 --version
          pip3 --version
        ```

-----

### Verificando a Instalação

Após a instalação, é **fundamental verificar** se o Python foi instalado corretamente e se o **PATH** (variável de ambiente que indica ao sistema onde encontrar executáveis) está configurado.

  * Abra o **terminal/prompt de comando** do seu sistema.
  * Digite `python --version` (no Windows) ou `python3 --version` (no macOS/Linux).
  * Você deverá ver a versão do Python que acabou de instalar. Se você vir uma mensagem de erro como "comando não encontrado", o PATH pode não ter sido configurado corretamente, e você pode precisar adicioná-lo manualmente (embora o instalador oficial do Windows geralmente faça isso automaticamente se a opção for marcada).

-----

### Próximos Passos

Agora que você tem o Python instalado, você pode começar a:

  * **Escrever e executar scripts Python.**
  * **Instalar pacotes e bibliotecas adicionais** usando o `pip` (o gerenciador de pacotes do Python), como `pip install numpy` ou `pip install pandas`.
  * **Explorar ambientes de desenvolvimento integrados (IDEs)** como VS Code, PyCharm ou Jupyter Notebooks para uma experiência de codificação mais completa.

Se tiver alguma dúvida durante o processo, sinta-se à vontade para perguntar\!