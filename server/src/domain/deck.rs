use async_graphql::SimpleObject;
use uuid::Uuid;

use crate::types::{Card, EntityId};

#[derive(Clone, Debug, SimpleObject)]
pub struct Deck {
    pub id: EntityId,
    pub cards: Vec<Card>,
}

impl Deck {
    pub fn new() -> Self {
        Deck {
            id: Uuid::new_v4(),
            cards: vec![
                "0".to_string(),
                "1".to_string(),
                "2".to_string(),
                "3".to_string(),
                "4".to_string(),
                "5".to_string(),
                "6".to_string(),
                "7".to_string(),
                "8".to_string(),
                "9".to_string(),
                "10".to_string(),
                "11".to_string(),
                "12".to_string(),
                "13".to_string(),
                "14".to_string(),
                "15".to_string(),
                "?".to_string(),
                "☕".to_string(),
            ],
        }
    }
}
