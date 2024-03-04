import React from "react";
import { Button, Heading } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { FlagIcon } from "react-flag-kit";

export default function TitleHeader() {
  return (
    <div className="header">
      <div className="title">
        <Heading className="Title" size="lg" color="darkslategrey">
          Spanglish Translator
        </Heading>
        <div className="flags">
          <FlagIcon code="US" size={30} />
          <FlagIcon code="ES" size={30} />
          <FlagIcon code="FR" size={30} />
          <FlagIcon code="IT" size={30} />
        </div>
      </div>
      <a href="https://github.com/bsymmers">
        <Button leftIcon={<FaGithub />} size="sm">
          Github
        </Button>
      </a>
    </div>
  );
}
