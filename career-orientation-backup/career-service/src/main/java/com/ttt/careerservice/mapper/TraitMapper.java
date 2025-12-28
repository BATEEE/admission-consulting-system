package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.TraitResponseDTO;
import com.ttt.careerservice.model.Trait;

public class TraitMapper {
    public static TraitResponseDTO toDTO(Trait trait) {
        TraitResponseDTO traitResponseDTO = new TraitResponseDTO();
        traitResponseDTO.setCode(trait.getCode());
        traitResponseDTO.setNameVie(trait.getNameVie());
        traitResponseDTO.setNameEn(trait.getNameEn());
        traitResponseDTO.setDescription(trait.getDescription());
        return  traitResponseDTO;
    }
}
