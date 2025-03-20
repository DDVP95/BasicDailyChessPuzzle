package com.chessgg.chessapp.maven.controller;

import com.chessgg.chessapp.maven.model.Puzzle;
import com.chessgg.chessapp.maven.service.PuzzleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api")
public class PuzzleApiController {

    @Autowired
    private PuzzleService puzzleService;

    
    @GetMapping("/daily-puzzle/view")
    public ResponseEntity<Puzzle> getDailyPuzzle() {
        
        LocalDate today = LocalDate.now();
        return puzzleService.getDailyPuzzle(today)
                .map(ResponseEntity::ok) 
                .orElse(ResponseEntity.notFound().build()); 
    }
}
