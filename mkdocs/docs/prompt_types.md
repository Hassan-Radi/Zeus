# Prompt types

<script type="text/javascript" src="/js/ui.js"></script>
<script type="text/javascript" src="/js/actions.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>

This page explains the types of prompts that are supported in the prompt library. You can look at
this from different angles:

1. How many examples you've provided to the AI model, before asking it to make a prediction? For
   this the types of prompts can be:
    - Zero-shot prompt
    - One-shot prompt
    - Few-shot prompt
2. Did you give the AI model some basic instructions to limit or control what the user can do? or
   the user
   has
   complete freedom to ask what they want? For this the types of prompts can be:
    - User prompt
    - System prompt
3. Can you use the prompt right away? or you need to provide data or answer
   questions first? For this the types of prompts can be:
    - Template prompt
    - Interactive prompt

## 1. Providing examples to the AI

<h3 id="zero-shot-prompt">Zero-shot prompt</h3>

When you ask the AI model to make predictions or answer questions without providing examples on how
to do it first. Like the following:

> Using simple terms, explain Quantum Physics for me

<h3 id="oneshot-prompt">One-shot prompt</h3>

When you provide one example to the AI model before asking it to make predictions or answer
questions. You are therefore providing further training to
the AI model. This is useful for hard tasks and helps the AI to produce better results.

<h3 id="few-shot-prompt">Few-shot prompt</h3>

When you provide multiple examples to the AI model. The more examples you provide, the better the AI
would be at answering your questions. This is useful for complex tasks that involve multiple things
to do.

## 2. Limiting the AI

<h3 id="user-prompt">User prompt</h3>

This is the default way to interact with most LLMs in the market. The user is free to ask the AI
model what they want, whether that's to answer a question, solve a puzzle or just have a chat to
keep them entertained.

<h3 id="system-prompt">System prompt</h3>

This is a more structured form of prompting. First, you give the AI model a set of instructions on
what it can and can't do. You can instruct it to not answer specific questions, not use swear words
or not to discriminate against people. Once you define the rules and build your system prompt, then
the user can interact with the AI model given these rules. The user interface of OpenAI's Chat-GPT
is a kind of system prompt where they put restrictions/limitations on the AI to prevent people from
misusing it.

## 3. Providing data to the AI

<h3 id="template-prompt">Template prompt</h3>

When you have one or more variables in the prompt itself. The user has to provide values for those
variables before they can start using the prompt. like the following:

> Using simple terms, explain {{TOPIC}} for me

Here, the user has to replace the variable `{{TOPIC}}` with the actual topic that they want the AI
model to explain.

<h3 id="interactive-prompt">Interactive prompt</h3>

It is a type of <a type="button" class="button-secondary" href="#system-prompt">System prompt</a> where you give instructions to the AI model about
what actions to perform and maybe ask it to collect some data from the user.
This way of collecting data is why the prompt is called "Interactive" (The alternative
would be to put the data as variables in the prompt itself). This can be very useful when you are
building a chat-bot or an interactive virtual teacher for kids.
