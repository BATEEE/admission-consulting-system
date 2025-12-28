package com.ttt.careerservice.mapper;

import com.ttt.careerservice.dto.OccupationResponseDTO;
import com.ttt.careerservice.model.Occupation;

public class OccupationMapper {
    public static OccupationResponseDTO toDTO(Occupation occupation) {
        OccupationResponseDTO occupationResponseDTO = new OccupationResponseDTO();
        occupationResponseDTO.setId(occupation.getId());
        occupationResponseDTO.setCode(occupation.getCode());
        occupationResponseDTO.setTitleEn(occupation.getTitleEn());
        occupationResponseDTO.setDescriptionEn(occupation.getDescriptionEn());
        occupationResponseDTO.setTitleVie(occupation.getTitleVie());
        occupationResponseDTO.setDescriptionVie(occupation.getDescriptionVie());
        return occupationResponseDTO;
    }
}
