package com.ttt.careerservice.controller;

import com.ttt.careerservice.dto.BlockResponseDTO;
import com.ttt.careerservice.service.BlockService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/blocks")
public class BlockController {
    private final BlockService blockService;

    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }

    @GetMapping("/with-subjects")
    public List<BlockResponseDTO> getBlocksWithSubjects() {
        return blockService.getAllBlocksWithSubjects();
    }
}
